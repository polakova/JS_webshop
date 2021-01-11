/*

Autor: Táňa Poláková

Zdroje použitých obrázkov:
* Reklamný banner: Bru-nO (pixabay.com)
* Obrázok produktu Firefox: The Mozilla Foundation, CC BY 3.0 https://creativecommons.org/licenses/by/3.0, via Wikimedia Commons
* Obrázok produktu Internet Explorer: https://pixy.org/635084/, CC BY-NC-ND 4.0
* Obrázok produktu Google Chrome: Icon Mafia, https://iconscout.com/icon/google-chrome-17, 

*/

const express = require('express');
const bodyParser  = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');

const app = express();
const port = 8080;

var counter_id;

const connection = mysql.createConnection({
    host: "mydb",
    user: "root",
    password: "root"
});

const sess = {
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
};

app.use(session(sess));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));


app.get('/home', (req, res) => {
    queryHelper("SELECT * FROM products", (result) => {
        var arr = [], len = result.length;

        for (var i = 0; i < len; i++){
            arr.push(JSON.parse(JSON.stringify(result[i])));
        }
        res.send(JSON.stringify({"data": arr}));
    });
});


app.get('/admin', (req, res) => {
    queryHelper("select orders.id as order_id, customers.name as name, products.name as product_name, order_items.quantity as quantity, orders.paid as paid " +
                "from orders " + 
                "left join customers on orders.user_id = customers.id " + 
                "left join order_items on orders.id = order_items.order_id " + 
                "inner join products on order_items.product_id = products.id " +
                "ORDER BY orders.id, customers.name", 
        (qres) => {
            qres = JSON.parse(JSON.stringify(qres));
            let result = [], len = qres.length;

            if(len != 0){
                let last = qres[0].order_id, last_index = 0;
                for (let i = 0; i < len; i++){
                    if(qres[i].order_id != last){
                        last = qres[i].order_id;
                        last_index += 1;
                    }

                    let cust_name = 'Zatiaľ neidentifikovaný', state_paid = 'V košíku';

                    if(qres[i].paid == 1){
                        state_paid = 'Vyplatené';
                    }
                    if(qres[i].name != null){
                        cust_name = qres[i].name;
                    }
                    if(result[last_index]){
                        result[last_index].products.push({name: qres[i].product_name, quantity: qres[i].quantity});
                    }
                    else{
                        result.push({name: cust_name, order_id: qres[i].order_id, products: [{name: qres[i].product_name, quantity: qres[i].quantity}], paid: state_paid});
                    }
                }

                queryHelper("SELECT * FROM counter", (qres) => {
                    if(qres.length != 0){
                        qres = JSON.parse(JSON.stringify(qres[0]));
                        
                        res.send(JSON.stringify({"orders": result, "counter": qres.clicks}));
                    }
                    else{
                        res.send(JSON.stringify({"orders": result, "counter": 0}));
                    }
                });
                
            }
        }
    )
});


app.get('/basket', (req, res) => {
    queryHelperParams("SELECT id FROM orders WHERE session_id=? AND paid=0", [req.session.id], (qres) => {

        if (qres.length != 0){
            qres = JSON.parse(JSON.stringify(qres[0]));

            queryHelperParams("SELECT products.id as id, products.image as image, products.name as name, products.cost as cost, order_items.quantity as quantity " +
                              "FROM order_items " +
                              "INNER JOIN products ON order_items.product_id = products.id " +
                              "WHERE order_items.order_id=?", [qres.id], (qres_1) => {

                                qres_1 = JSON.parse(JSON.stringify(qres_1));
                                res.send(JSON.stringify({"basket": qres_1}));
                              });
        }
        else{
            res.send(JSON.stringify({"basket": []}));
        }
    });
});


app.post('/order/basket/update', (req, res) => {
    let product_id = req.body.product_id, quantity = req.body.quantity;

    queryHelperParams("SELECT id FROM orders WHERE session_id=? AND paid=0", [req.session.id], (qres) => {

        if(qres.length != 0) {
            qres = JSON.parse(JSON.stringify(qres[0]));

            queryHelperParams("SELECT * FROM order_items WHERE order_id=? AND product_id=?", [qres.id, product_id], (qres_1) => {

                if (qres_1.length != 0){
                    qres_1 = JSON.parse(JSON.stringify(qres_1[0]));
        
                    if(quantity == 0){
                        queryHelperParams("DELETE FROM order_items WHERE order_id=? AND product_id=?", [qres.id, product_id], (qres_2) => {});
                    }
                    else{
                        queryHelperParams("UPDATE order_items SET quantity=? WHERE order_id=? AND product_id=?", [quantity, qres.id, product_id], (qres_2) => {});
                    }
                }
                else{
                    queryHelperParams("INSERT INTO order_items (id, order_id, product_id, quantity) VALUES (0, ?, ?, ?)", [qres.id, product_id, quantity], (qres_2) => {});
                }
                
            });
        }
        else{
            queryHelperParams("INSERT INTO orders (id, paid, session_id) VALUES (0, 0, ?)", [req.session.id], (qres_1) => {
                order_id = qres_1.insertId;
                
                queryHelperParams("INSERT INTO order_items (id, order_id, product_id, quantity) VALUES (0, ?, ?, ?)", [order_id, product_id, quantity], (qres_2) => {
                   
                });
            });
        }
    });

    res.send(JSON.stringify({"status": 200}));
});


app.post('/order/user', (req, res) => {
    let user = req.body.user, order_id = req.body.order_id;

    queryHelperParams("SELECT * FROM customers WHERE name=?", user.name, (qres) => {
        if (qres.length == 0){
            queryHelperParams("INSERT INTO customers (id, name, street, number, city, zipcode) VALUES (0, ?, ?, ?, ?, ?)", [user.name, user.street, user.house_number, user.city, user.zipcode], (qres_1) => {
                queryHelperParams("UPDATE orders SET user_id=?, paid=1 WHERE session_id=? AND paid=0", [qres_1.insertId, req.session.id], (qres_2) => {});
            });
        }
        else {
            qres = JSON.parse(JSON.stringify(qres[0]));
            queryHelperParams("UPDATE orders SET user_id=?, paid=1 WHERE session_id=? AND paid=0", [qres.id, req.session.id], (qres_1) => {});
        }
    });

    res.send(JSON.stringify({"status": 200}));
});


app.get('/banner', (req, res) => {
    res.send(JSON.stringify({"image": "https://storage.needpix.com/rsynced_images/advertisement-2098989_1280.jpg"}));
});


app.get('/banner/clicked', (req, res) => {
    queryHelperParams("SELECT clicks FROM counter WHERE id=?", [counter_id], (qres) => {
        qres = JSON.parse(JSON.stringify(qres[0]));

        queryHelperParams("UPDATE counter SET clicks=? WHERE id=?", [qres.clicks+1, counter_id], (qres_1) => {
            res.send(JSON.stringify({"status": 200}));
        });
    });
});


function queryHelperParams(query, params, callback){
    connection.query(query, params, (err, result) => {
        if(err){
            throw err;
        }
        else{
            //console.log("Executed: " + query);
            return callback(result);
        }
    })
}


function queryHelper(query, callback){
    connection.query(query, (err, result) => {
        if(err){
            throw err;
        }
        else{
            //console.log("Executed: " + query);
            return callback(result);
        }
    })
}


function getCounterId(){
    queryHelper("SELECT * FROM counter", (qres) => {
        if(qres.length != 0){
            qres = JSON.parse(JSON.stringify(qres[0]));
            
            counter_id = qres.id;
        }
        else{
            queryHelper("INSERT INTO counter VALUES(0, 0)", (qres) => {
                counter_id = qres.insertId;
            });
        }
    });
}


function createDatabase(){
    queryHelper("CREATE DATABASE xpolakovat", (qres) => {});
    queryHelper("USE xpolakovat", (qres) => {});
    
    queryHelper("CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), image VARCHAR(255), cost INT)", (qres) => {});
    queryHelper("CREATE TABLE counter (id INT AUTO_INCREMENT, clicks INT, PRIMARY KEY(id))", (qres) => {});
    queryHelper("CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), street VARCHAR(255), number VARCHAR(10), city VARCHAR(255), zipcode VARCHAR(10))", (qres) => {})
    queryHelper("CREATE TABLE orders (id INT AUTO_INCREMENT, user_id INT, session_id VARCHAR(100), paid BOOL, PRIMARY KEY(id), FOREIGN KEY(user_id) REFERENCES customers(id))", (qres) => {});
    queryHelper("CREATE TABLE order_items (id INT AUTO_INCREMENT, order_id INT, product_id INT, quantity INT, PRIMARY KEY(id), FOREIGN KEY(order_id) REFERENCES orders(id), FOREIGN KEY(product_id) REFERENCES products(id))", (qres) => {});

    queryHelper("INSERT INTO products VALUES (0, 'Google Chrome', 'https://cdn.iconscout.com/icon/free/png-256/google-chrome-17-1175307.png', 20)", (qres) => {});
    queryHelper("INSERT INTO products VALUES (0, 'Firefox', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Mozilla_Firefox_logo_2013.svg/512px-Mozilla_Firefox_logo_2013.svg.png', 50)", (qres) => {});
    queryHelper("INSERT INTO products VALUES (0, 'Internet Explorer', 'https://pixy.org/src/63/thumbs350/635084.jpg', 100)", (qres) => {});
    
    getCounterId();
}


// spustenie serveru
app.listen(port, () => {
    connection.connect((err) => {
        if (err){
            throw err;
        }
        else{
            console.log("Mysql connected.");
            createDatabase();
        }
    });
    console.log('Server listening.');
});