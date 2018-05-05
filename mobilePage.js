module.exports=function(app,rpcf,timeout){
    var express = require('express');
    var router = express.Router();
    var fs=require('fs');

    router.get("/createAddress",function(req,res){
        rpcf.createKeyPairs(function(accInfo){
            setTimeout(function(){
                rpcf.grant(accInfo[0]['address'],'connect,send,receive',function(grantInfo){
                    rpcf.importAddress(accInfo[0]['address'],function(importAddrInfo){
                        res.send(accInfo);
                    })
                })
            },timeout);
        });
    });

    router.post("/addressBalances",function(req,res){
        var address=req.body.address;
    


        rpcf.getAddressBalances(address,function(info){
            setTimeout(function(){

                res.send(info);

            },timeout);
        })

    });

    router.post("/getfreecredit",function(req,res){
        var address=req.body.address;
    
        rpcf.sendAsset(address,'UC',100,"","",function(sendInfo){
            rpcf.getAddressBalances(address,function(info){
                setTimeout(function(){
    
                    res.send(info);
    
                },timeout);
            });
        });       
    });

    router.post("/publish",function(req,res){
        var addr=req.body.address;
        var txtname=req.body.name;
        var price=req.body.price;
        var data=req.body.data;
       

        var inputdata= "[{\"address\":\""+addr+"\",\"price\":"+price+ ",\"description\":\""+data+"\"}]";
        var datahex=Buffer.from(inputdata, 'utf8').toString('hex');

        // res.send(req.body);
        rpcf.publishM("mobile01",txtname,datahex,function(info){
            setTimeout(function(){
                res.send(info)
            },timeout);
        });



    });
    router.post("/getitems",function(req,res){
        var stream="mobile01";//req.body.stream;

        rpcf.listStreamItemsM(stream,function(info){
            setTimeout(function(){
                res.send(info)
            },timeout);
        });
    });
    router.post("/getdetailitem",function(req,res){
        var stream="mobile01";//req.body.stream;
        var txid=req.body.txid;
        // res.send(req.body);

        rpcf.getStreamItemM(stream,txid,function(info){
            setTimeout(function(){
                res.send(info)
            },timeout);
        });
    });




    return router;
    
}