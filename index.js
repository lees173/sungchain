
var express = require("express");
var path = require('path');
var app = express();
var ejs=require("ejs");
var bodyparser= require("body-parser");
app.use(express.static(path.join(__dirname,'/public')));
app.set("view engine","ejs");
// app.use('/img',express.static(path.join(__dirname, "public/images")));
// app.use(express.static(path.join(__dirname, "public")));

// app.use('/static', express.static(path.join(__dirname,'/public'));
var timeout = 500;
var userID = 5;

app.use(bodyparser.urlencoded({
    extended: true
}));



var rpcConnection = require('./rpcConnection');
var userRPC=rpcConnection.userRPC(userID);




function getInfo(callback){
    

    userRPC.getInfo((err, info) => {
        if(err){
            throw err;
        }
        callback(info);
    })
};
function getListpermissions(permission, callback){
    

    userRPC.listPermissions({"permissions":permission},(err, info) => {
        if(err){
            throw err;
        }
        callback(info);
    })

};

function getListAddress(callback){
    

    userRPC.listPermissions({"addresses":"*"},(err, info) => {
        if(err){
            throw err;
        }
        callback(info);
    })

};

function getIssue(callback){
    getListAssets(function(assetInfo){
        getListpermissions('issue',function(permissionInfo){
            callback(assetInfo,permissionInfo)
        
        });
        
        
    });

    
    
    


};

function getListAssets(callback){
   
    userRPC.listAssets((err,info)=>{
        if(err){
            throw err;
        }
        callback(info);

    });
}
function setIssue(txtaddress,txtasset,txtamount,txtunit,txtcomment,callback){
    
    userRPC.issue({address: txtaddress, asset: txtasset, qty: parseInt(txtamount), units: parseFloat(txtunit), details: {comment: txtcomment}},(err,info)=>{
        if(err){
            throw err;
        }
        callback(info);

    });
}

function getBlockInfo(numberofblocks, callback){
    
    userRPC.listBlocks({blocks: "1-10"},(err,info)=>{
        if(err){
            throw err;
        }
        callback(info);

    });
}

app.get("/",function(req,res){
    res.render("index");
});

app.get("/info",function(req,res){
    res.render("getInfo");
});
app.get("/asset",function(req,res){
    res.render("getasset")

});
app.get("/block",function(req,res){
    res.render("getblockInfo");
});
app.get("/recentblock",function(req,res){
    getBlockInfo("-10",function(info){
        setTimeout(function() {
            res.render("getrecentblock",{
                info:JSON.stringify(info)
            });
        },timeout);

    });
    
});

app.get("/getInfo",function(req,res){
    getInfo(function(info){
        setTimeout(function() {
        res.render("getInfo",{
            info:JSON.stringify(info)
        });
    },timeout);
    });

    // res.send("Select Tap among ( List Address, List Permissions, List Assets)")
});





app.get("/listaddress",function(req,res){
    getListAddress(function(info){
        setTimeout(function() {
        res.render("listaddress",{
            info:JSON.stringify(info)
        });
    },1000);
    });

});
app.get("/listpermissions",function(req,res){
    // getListpermissions(function(info){
    //     setTimeout(function(){
    //         res.render("listpermissions",{
    //             info:JSON.stringify(info)
    //         });
    //     });
    // });
    res.render("listpermissions")

});

app.post("/listpermissions",function(req,res){
    var strSelected = req.body.selectedPermission;

    
    getListpermissions(strSelected,function(info){
        setTimeout(function(){
            res.render("postlistpermissions",{
                permissionInfo:JSON.stringify(info)
            });
        },timeout);
    });

});

app.get("/listassets",function(req,res){
    getListAssets(function(info){
        setTimeout(function(){
            res.render("listassets",{
                assetInfo: JSON.stringify(info)
            });
        },timeout);
    });
});

 
app.get("/issue",function(req,res){


    
    getIssue(function(assetInfo,permissionInfo){

        console.log('issue');
        console.log(assetInfo);
        console.log(permissionInfo);



        setTimeout(function(){
            res.render("getIssue",{
                permissionInfo:JSON.stringify(permissionInfo),
                assetInfo: JSON.stringify(assetInfo)
               
    
            });
         
        },timeout);
    });
    



});



app.post("/issue",function(req,res){

    var txtaddress = req.body.txtaddress;
    var txtasset = req.body.txtasset;
    var txtamount = req.body.txtamount;
    var txtunit = req.body.txtunit;
    var txtcomment = req.body.txtcomment;


    setIssue(txtaddress,txtasset,txtamount,txtunit,txtcomment,function(info){
        setTimeout(function(){
            
            res.render("postIssue",{
                info:JSON.stringify(info)
            });
        },timeout);
    });

});



app.get("/sendmoney",function(req,res){
    getInfo(function(info){
        setTimeout(function() {
        res.render("getInfo",{
            info:JSON.stringify(info)
        });
    },1000);
    });

});
    
    



app.listen(5000,function(){
    console.log("go");
})










// var someAddress ="12we3R65Sy6Z93sVy7kNErZxy4inYLvpoZ7jFt";
// var someOtherAddress="1VJSHGo6peQWLpwdhQgeyinddJVrUndPyeurbr";

// multichain.issue({address: someAddress, asset: "zcoin", qty: 50000, units: 0.01, details: {hello: "world"}}, (err, res) => {
//     console.log(res)
// })

// multichain.sendAssetFrom({from: someAddress, to: someOtherAddress, asset: "zcoin", qty: 5}, (err, tx) => {
//     console.log(tx);
// })

// multichain.getAddresses((err, addresses) => {

//     multichain.createMultiSig({nrequired: 2, keys: addresses}, (err, wallet) => {
//         console.log(wallet)
//     })
    
// })

// multichain.getRawTransaction({txid: someTxId}, (err, tx) => {

//     multichain.decodeRawTransaction({"hexstring": tx}, (err, dTx) => {
//         console.log(dTx)
//     })
// })