module.exports=function(app,rpcf,timeout){
    var express = require('express');
    var router = express.Router();
    var fs=require('fs');
    


    router.get("/",function(req,res){
        res.render("index");
    });

    router.get("/info",function(req,res){
        res.render("getInfo");
    });


    router.get("/asset",function(req,res){
        res.render("getasset")

    });
    router.get("/block",function(req,res){
        res.render("getblockInfo");
        
    });

    router.get("/data",function(req,res){
        res.render("getData");
    });

    router.get("/recentblock",function(req,res){
        rpcf.getBlockInfo("-10",function(info){
            setTimeout(function() {
                res.render("getrecentblock",{
                    info:JSON.stringify(info)
                });
            },timeout);

        });
        
    });




    router.get("/getInfo",function(req,res){

    rpcf.getInfo(function(info){
            setTimeout(function() {
            res.render("getInfo",{
                info:JSON.stringify(info)
            });
        },timeout);
        });
    });

    router.get("/listNodeaddress",function(req,res){


        rpcf.getListNodeAddress(function(info){
            setTimeout(function() {
            res.render("listaddress",{
                info:JSON.stringify(info)
            });
        },timeout);
        });

    });
    router.get("/listpermissions",function(req,res){
    
        res.render("listpermissions")

    });

    router.post("/listpermissions",function(req,res){
        var strSelected = req.body.selectedPermission;

        rpcf.getListpermissions(strSelected,function(info){
            setTimeout(function(){
                res.render("postlistpermissions",{
                    permissionInfo:JSON.stringify(info)
                });
            },timeout);
        });

    });

    router.get("/listassets",function(req,res){
        rpcf.getListAssets(function(info){
            setTimeout(function(){
                res.render("listassets",{
                    assetInfo: JSON.stringify(info)
                });
            },timeout);
        });
    });

    /// Asset Tap/////////////
    router.get("/issue",function(req,res){  
        
        rpcf.getListAssets(function(assetInfo){
            rpcf.getListpermissions('issue',function(permissionInfo){
                setTimeout(function(){
                    res.render("getIssue",{
                        permissionInfo:JSON.stringify(permissionInfo),
                        assetInfo: JSON.stringify(assetInfo)
                    });
                },timeout);
            });
        });
    });



    router.post("/issue",function(req,res){

        var txtaddress = req.body.slttoaddress;
        var txtasset = req.body.txtasset;
        var txtamount = req.body.txtamount;
        var txtunit = req.body.txtunit;
        var txtcomment = req.body.txtcomment;


        rpcf.setIssue(txtaddress,txtasset,txtamount,txtunit,txtcomment,function(info){
            setTimeout(function(){
                
                res.render("postIssue",{
                    info:JSON.stringify(info)
                });
            },timeout);
        });

    });
    // router.get("/sendasset",function(req,res){

    //     rpcf.getListNodeAddress(function(addrlist){
    //         rpcf.getAddressBalances('*',function(balanceInfo){ ///need addreess
    //             setTimeout(function(){
    //                 res.render("getSendAsset",{
    //                     balance:JSON.stringify(balanceInfo),
    //                     addrlist:JSON.stringify(addrlist)

    //                 });
    //             },timeout);

    //         }) 
            
    //     });

    //     //     rpcf.getAddressBalances(function(balance){

    //     //         setTimeout(function(){
    //     //             // res.send(balance)
    //     //             res.render("getSendAsset",{
    //     //                 balance:JSON.stringify(balance),
    //     //                 addrlist:JSON.stringify(addrlist)

    //     //             }); 
    //     //         },timeout);
    //     //     });
    //     // })

    // });
    // router.post("/postsendasset",function(req,res){

    //     var slttoaddr=req.body.slttoaddress;

    

    //     var txtasset = req.body.txtasset;
    //     var txtamount = parseInt(req.body.txtamount);
    //     var txtcomment = req.body.txtcomment;
    //     var txtcommentto = req.body.txtcommentto;
    //     // res.send("not ready")
    //     rpcf.sendAsset(slttoaddr,txtasset,txtamount,txtcomment,txtcommentto,function(info){

    //         setTimeout(function(){
    //             res.render("postSendAsset",{
    //                 info:JSON.stringify(info)
    //             });

    //         });

    //     });
        
    

    // });


    // router.get("/sendassetfrom",function(req,res){

    //     rpcf.getListNodeAddress(function(addrlist){
    //         rpcf.getAddressBalances(function(balance){

    //             setTimeout(function(){
    //                 res.render("getSendAssetFrom",{
    //                     balance:JSON.stringify(balance),
    //                     addrlist:JSON.stringify(addrlist)

    //                 }); 
    //             },timeout);
    //         });
    //     })

    // });

    router.post("/postsendassetfrom",function(req,res){

        var sltfromaddr=req.body.sltfromaddress;
        var slttoaddr=req.body.slttoaddress;

    

        var txtasset = req.body.txtasset;
        var txtamount = parseInt(req.body.txtamount);
        var txtcomment = req.body.txtcomment;
        var txtcommentto = req.body.txtcommentto;
        // res.send("not ready")
        rpcf.sendAssetFrom(sltfromaddr,slttoaddr,txtasset,txtamount,txtcomment,txtcommentto,function(info){

            setTimeout(function(){
                res.render("postSendAsset",{
                    info:JSON.stringify(info)
                });

            });

        });
    });


    /////Data tap/////////////////

    router.get("/createstream",function(req,res){
        rpcf.listStreams(function(info){
            setTimeout(function(){
                res.render("getcreatestream",{
                    info:JSON.stringify(info)
                });
                
            },timeout);

        });

    });
    router.post("/postcreatestream",function(req,res){

        var txtname = req.body.txtstreamname;
        var txtdetail = req.body.txtstreamdetail;
        rpcf.createStream(txtname,txtdetail,function(info){
            setTimeout(function(){

                rpcf.listStreams(function(info){
                    setTimeout(function(){
                        res.render("getcreatestream",{
                            info:JSON.stringify(info)
                        });
                        
                    },timeout);

                });
            },timeout);

        });
    });


    router.get("/publishmessage",function(req,res){
        res.send("<h1>Not ready </br>")

    });
    router.get("/publishfile",function(req,res){
        res.send("<h1>Not ready </br>")

    });
    router.get("/makesmartcontract",function(req,res){
        res.render("makesmartcontract")

    });

    router.post("/makesmartcontract",function(req,res){
        var txtname = req.body.txtname;
    var txtContract = req.body.txtContract;
    var datahex=Buffer.from(txtContract, 'utf8').toString('hex');

    

        rpcf.publish(txtname,datahex,function(info){
            setTimeout(function(){
                res.render("postmakesmartcontract",{
                    info:JSON.stringify(info)
                });
            },timeout);
        });

    });


    router.get("/getsmartcontract",function(req,res){
        rpcf.listStreamItems(function(info){
            setTimeout(function(){
                res.render("getsmartcontract",{
                    info:JSON.stringify(info)
                });
            },timeout);

        });
    
    });



    router.post("/getsmartcontract",function(req,res){

        var txttxid=req.body.txttxid;
        rpcf.getStreamItem(txttxid,function(info){

            setTimeout(function(){
                var getcontractdata=Buffer.from(info.data,'hex').toString('utf8');
                fs.writeFile('./views/contract.ejs',getcontractdata,function(){
                    res.render("postsmartcontract",{
                        info:getcontractdata
                    });
                });

                
            },timeout);

        });
    
    });






    return router;
    
}