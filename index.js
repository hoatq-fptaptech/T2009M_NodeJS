const express =  require("express");
const mssql = require("mssql");
const bodyParser = require("body-parser");
const app = express(); // xay tru so
const port = process.env.PORT || 5000; // khai bao cong vao
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// mo cong tru so
app.listen(port,function (err) {
    console.log("Server is running...");
})
// ket noi database
const config = {
    server:"demosqlgroup.database.windows.net",
    user:"quanghoa",
    password:"t2008m123!",
    database:"Development"
}
mssql.connect(config,function (err) {
    if(err) console.log(err);
    else console.log("DB connected");
});
const sql = new mssql.Request();
// thue 1 nhan vien
app.get("/",function (req,res) {
    res.send("Xin chao ban");
})
app.get("/nv-ketoan",function (req,res) {
    res.send("Vui long nop tien");
})
app.get("/dong-xe",function (req,res) {
    var txt = "select * from Dongxe";
    sql.query(txt,function (err,rows) {
        if(err) res.send("Khong tim thay dong xe nao");
        else res.send(rows.recordset);
    })
})
app.get("/dk-cungcap",function (req,res) {
    var txt = "select * from Dangkycungcap left join Dongxe on Dongxe.Dongxe = Dangkycungcap.Dongxe";
    sql.query(txt,function (err,rows) {
        if(err) res.send("Khong tim thay dk nao");
        else res.send(rows.recordset);
    })
})
app.get("/tim-dong-xe",function (req,res) {
    var ts = req.query.hx;
    var sc = req.query.socho;
    var txt = "select * from Dongxe where Hangxe like '%"+ts+"%' OR SoChoNgoi = "+sc;
    sql.query(txt,function (err,rows) {
        if(err) res.send("Khong tim thay dong xe nao");
        else res.send(rows.recordset);
    })
})
app.post("/them-dong-xe",function (req,res) {
    var dx = req.body.dongxe;
    var hx = req.body.hangxe;
    var sc = req.body.socho;
    var txt = "insert into Dongxe(Dongxe,Hangxe,SoChoNgoi) values('"+dx+"',N'"+hx+"',"+sc+")";
    sql.query(txt,function (err) {
        if(err) res.send("Them dong xe that bai");
        else res.send("Them thanh cong");
    })
})
app.post("/sua-dong-xe",function (req,res) {
    var dx = req.body.dongxe;
    var hx = req.body.hangxe;
    var sc = req.body.socho;
    var txt = "update Dongxe set Hangxe = '"+hx+"' , SoChoNgoi= "+sc+" WHERE Dongxe = '"+dx+"'";
    sql.query(txt,function (err) {
        if(err) res.send("Sua dong xe that bai");
        else res.send("Sua thanh cong");
    })
})
app.post("/xoa-dong-xe",function (req,res) {
    var dx = req.body.dongxe;
    var txt = "delete from Dongxe where Dongxe = '"+dx+"'";
    sql.query(txt,function (err) {
        if(err) res.send("Xoa dong xe that bai");
        else res.send("Xoa thanh cong");
    })
})
