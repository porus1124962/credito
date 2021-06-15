const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getDateTime = functions.https.onCall(()=>{
    return Date.now();
});

// exports.pushData2 = functions.https.onRequest((request, response) => {
//     var email = request.query.email;
//     var pass = request.query.pass;
//     var coins = request.query.coins;
//     var amazeLevels = request.query.amazeLevels;
//     var wordCompletionNo = request.query.wordCompletionNo;
//     var res = "no res";

//     if(email !== "" && pass !== "" && coins !== "" && parseInt(coins) > 100 && amazeLevels !== "" && wordCompletionNo !== ""){
//         //create a user
//         admin.auth().createUser({
//             email: email,
//             emailVerified: false,
//             password: pass,
//             displayName: 'Unknown User',
//             disabled: false
//         }).then((userRecord)=>{
//             // See the UserRecord reference doc for the contents of userRecord.
//             // console.log('Successfully created new user:', userRecord.uid);
//             var uid = userRecord.uid;

//             res += "uid "+uid+" wcomNo "+wordCompletionNo;

//             //save the coins
//             var coinsP = parseInt(coins);
//             var amazeLevelsP = parseInt(amazeLevels);
//             var wordCompletionNoP = parseInt(wordCompletionNo);
//             admin.firestore().collection("data").doc(uid).set({
//                 coins: coinsP,
//                 wordCompletionNo: wordCompletionNoP,
//                 amazeLevels: amazeLevelsP
//             }).then(()=>{
//                 res += " Success";
//                 response.send(res);
//                 return res;
//             }).catch((err)=>{
//                 res += " Error"+err.toString();
//                 response.send(res);
//             });
//             res += "some iss0";
//             return res;
//         }).catch((error)=>{
//             // console.log('Error creating new user:', error);
//             res += " "+error.toString();
//             response.send(res);
//         });
//     }
// });

// exports.pushData = functions.https.onCall((data, context)=>{
//     var email = data.email;
//     var pass = data.pass;
//     var coins = data.coins;
//     var amazeLevels = data.amazeLevels;
//     var wordCompletionNo = data.wordCompletionNo;

//     // if(email !== "" && pass !== "" && coins !== "" && parseInt(coins) > 100 && amazeLevels !== "" && wordCompletionNo !== ""){
//     //     //create a user
//     //     admin.auth().createUser({
//     //         email: email,
//     //         emailVerified: false,
//     //         password: pass,
//     //         displayName: 'Unknown User',
//     //         disabled: false
//     //     }).then((userRecord)=>{
//     //         // See the UserRecord reference doc for the contents of userRecord.
//     //         // console.log('Successfully created new user:', userRecord.uid);
//     //         const uid = userRecord.uid;

//     //         //save the coins
//     //         var coinsP = parseInt(coins);
//     //         var amazeLevelsP = parseInt(amazeLevels);
//     //         var wordCompletionNoP = parseInt(wordCompletionNo);
//     //         admin.firestore().collection("data").doc(uid).set({
//     //             coins: coinsP,
//     //             wordCompletionNo: wordCompletionNoP,
//     //             amazeLevels: amazeLevelsP
//     //         });
//     //         return "Success";
//     //     }).catch((error)=>{
//     //         console.log('Error creating new user:', error);
//     //         return error.toString();
//     //     });
//     // }
//     return "email is "+email+ "  pass is "+pass;
// });

// exports.initUser = functions.auth.user().onCreate((user) => {
//     admin.firestore().collection("data").doc(user.uid).set({
//         coins: 1,
//         wordCompletionNo: 0,
//         MathQuestionEasyNo: 0,
//         MathQuestionHardNo: 0,
//         MCQs: {}
//     });
// });

// exports.doValidPaymentTransaction = functions.https.onCall((data, context) => {
//     var uid = context.auth.uid;
//     var amount = data.requestedRs;
//     var opName = data.operator;
//     var num = data.num;
//     var appVersion = data.appVersion;

//     var ref = admin.firestore().collection("data").doc(uid);
//     const refToConversionRate = admin.firestore().collection("payment").doc("control");

    // return(uid + " , " +ref.toString());

    // ref.get()
    // .then((snapshot) => {
    //     var coins = snapshot.data().coins;
    //     return(coins + " coins + " + snapshot.toString());
        // refToConversionRate.get()
        // .then((snapshot)=>{
        //     var controlData = snapshot.data();
        //     var conversionRate = controlData.conversionOf1RS;
        //     var sims = controlData.sims;
        //     var opMinBal = sims[opName];
        //     const acBalance = parseInt((coins/conversionRate));
        //     const reducedCoins = parseInt(amount*conversionRate);
        //     const remainingCoins = coins-reducedCoins;

            // return("control data is "+ controlData.toString() + " , sims are  "+sims +" , opMinBal is "+ opMinBal+" , acBalance " +acBalance+ " remcoins "+remainingCoins);

            //check and request
            // if(opName === ""){
            //     return("Plz select a operator to go next");
            // }else if(num === "" || num === 0 || num.toString().length < 11){
            //     return("Plz Input Your Number Correctly.");
            // }else if(amount === "" || amount === 0){
            //     return("Plz Input Amount Correctly.");
            // }else if(opMinBal > amount){
            //     return("Can't send "+amount+" RS to "+opName.toUpperCase()+".\nMinimum requirement for "+opName.toUpperCase()+" is "+opMinBal+".");
            // }else if( acBalance < amount ){
            //     return("LOW BALANCE\nYou have not sufficient coins to convert to "+amount+" RS");
            // }

            // const payPendingRef = admin.firestore().collection("payment").doc("pending").collection("users").doc(uid);

            // payPendingRef.get().then((snap)=>{
            //     const data = snap.data();
                
                // var tReq;
                // if(data === null){
                //     tReq = 0;
                //     const key = "req" + (parseInt(tReq)+1);
                //     const dateTime = Date.now();
                //     payPendingRef.set({
                //         [key]:{
                //             num: num,
                //             operator: opName.toUpperCase(),
                //             rs: amount,
                //             time: dateTime,
                //             coins:{
                //                 remaining: remainingCoins,
                //                 total: coins
                //             },
                //             appVersion: appVersion
                //         },
                //         totalRequest: tReq+1
                //     }).then(()=>{
                //         admin.firestore().collection("data").doc(uid).update({
                //             coins: remainingCoins
                //         });
                //         return("Congrats! We have submitted your request.\nYou Will Receive The Easyload Soon.");
                //     },
                //     (err)=>{
                //         return(err.toString());
                //     })
                //     .catch((err)=>{
                //         return(err.toString());
                //     });
                // }else{
                //     tReq = data.totalRequest;
                //     const key = "req" + (parseInt(tReq)+1);
                //     var dateTime = Date.now();
                //     payPendingRef.update({
                //         [key]:{
                //             num: num,
                //             operator: opName.toUpperCase(),
                //             rs: amount,
                //             time: dateTime,
                //             coins:{
                //                 remaining: remainingCoins,
                //                 total: coins
                //             },
                //             appVersion: appVersion
                //         },
                //         totalRequest: tReq+1
                //     }).then(()=>{
                //         admin.firestore().collection("data").doc(uid).update({
                //             coins: remainingCoins
                //         });
                //         return("Congrats! We have submitted your request.\nYou Will Receive The Easyload Soon.")
                //     },
                //     (err)=>{
                //         return(err.toString());
                //     })
                //     .catch((err)=>{
                //         return(err.toString());
                //     });
                // }
                // return "completed";
            // })
            // .catch((err)=>{
            //     return(err.toString());
            // });
            // return "completed";
        // })
        // .catch((err)=>{
        //     return(err.toString());
        // });
        // return "completed";
//     })
//     .catch((err) => {
//         return(err.toString() + " error 1 hai");
//     });
// });


//final one is this
exports.doPaymentTransaction = functions.https.onRequest((request, response) => {
    var uid = request.query.uid;
    var amount = request.query.requestedRs;
    var opName = request.query.operator;
    var num = request.query.num;
    var appVersion = request.query.appVersion;

    // response.send("uid is "+uid+" , amount is "+amount+" , opName "+opName+" num "+num+" appv " + appVersion);

    const refUserData = admin.firestore().collection("data").doc(uid);
    const refToLevelToRate = admin.firestore().collection("payment").doc("levelToRate");
    refUserData.get()
    .then((snapshot) => {
        var coins = snapshot.data().coins;
        var levelNo = snapshot.data().level;
        var coinsHistoryLength = snapshot.data().coinsHistoryLength;
        if(Number.isNaN(coinsHistoryLength)){
            response.send("Invalid!");
            return;
        }
        refToLevelToRate.get().then((val) => {
            const levelToRates = val.data().conversion;

            const data = levelToRates.split('"').join('');
            const key = "level" + levelNo;
            const lvlIndex = data.indexOf(key);
            if(lvlIndex !== -1){
                const strStart = lvlIndex + key.length + 1;
                const strEnd = data.indexOf("|",strStart);
                var rate;
                if(strEnd === -1){
                    rate = data.substring(strStart,data.length);
                }else{
                    rate = data.substring(strStart,strEnd);
                }

                const refToConversionRate = admin.firestore().collection("control").doc(rate);

                refToConversionRate.get()
                .then((snapshot)=>{
                    var data = snapshot.data();
                    var conversionRate = data.Payment.conversionOf1RS;
                    var sims = data.Payment.sims;
                    var opMinBal = sims[opName.toLowerCase()];
                    const acBalance = parseInt((coins/conversionRate));
                    const reducedCoins = parseInt(amount*conversionRate);
                    const remainingCoins = coins-reducedCoins;
                    //check and request
                    if(Number.isNaN(coins) || Number.isNaN(conversionRate) || Number.isNaN(acBalance) || Number.isNaN(reducedCoins)){
                        response.send("Invalid!");
                        return;
                    }else if(opName === ""){
                        response.send("Plz select a operator to go next");
                        return;
                    }else if(num === "" || num === 0 || num.toString().length < 11){
                        response.send("Plz Input Your Number Correctly.");
                        return;
                    }else if(amount === "" || amount === 0){
                        response.send("Plz Input Amount Correctly.");
                        return;
                    }else if(opMinBal > amount){
                        response.send("Can't send "+amount+" RS to "+opName.toUpperCase()+".\nMinimum requirement for "+opName.toUpperCase()+" is "+opMinBal+".");
                        return;
                    }else if( acBalance < amount ){
                        response.send("LOW BALANCE\nYou have not sufficient coins to convert to "+amount+" RS");
                        return;
                    }

                    const payPendingRef = admin.firestore().collection("payment").doc("pending").collection("users").doc(uid);

                    payPendingRef.get().then((snap)=>{
                        const data = snap.data();
                        var tReq;
                        // response.send(data.toString());
                        if(data === null || data === "" || data === "undefined" || data === undefined){
                            tReq = 0;
                            const key = "req" + (parseInt(tReq)+1);
                            const dateTime = Date.now();
                            payPendingRef.set({
                                [key]:{
                                    num: num,
                                    operator: opName.toUpperCase(),
                                    rs: amount,
                                    time: dateTime,
                                    coins:{
                                        remaining: remainingCoins,
                                        total: coins
                                    },
                                    appVersion: appVersion,
                                    coinsHistoryLength: coinsHistoryLength,
                                    level: levelNo
                                },
                                totalRequest: tReq+1,
                                pendingRequest: 1,
                                completedRequest: 0
                            }).then(()=>{
                                admin.firestore().collection("data").doc(uid).update({
                                    coins: remainingCoins
                                });
                                response.send("Congrats! We have submitted your request.\nYou Will Receive The Easyload Soon.");
                                return null;
                            },
                            (err)=>{
                                response.send(err.toString());
                            })
                            .catch((err)=>{
                                response.send(err.toString());
                            });
                        }else{
                            var completedReq;
                            try{
                                completedReq = parseInt(data.completedRequest);
                                if(Number.isNaN(completedReq) === true || completedReq === null){
                                    completedReq = 0;
                                }
                            }catch(err){
                                completedReq = 0;
                            }
                            tReq = data.totalRequest;
                            const key = "req" + (parseInt(tReq)+1);
                            var dateTime = Date.now();
                            payPendingRef.update({
                                [key]:{
                                    num: num,
                                    operator: opName.toUpperCase(),
                                    rs: amount,
                                    time: dateTime,
                                    coins:{
                                        remaining: remainingCoins,
                                        total: coins
                                    },
                                    appVersion: appVersion,
                                    coinsHistoryLength: coinsHistoryLength,
                                    level: levelNo
                                },
                                totalRequest: tReq+1,
                                pendingRequest: ((tReq+1) - completedReq)
                            }).then(()=>{
                                admin.firestore().collection("data").doc(uid).update({
                                    coins: remainingCoins
                                });
                                response.send("Congrats! We have submitted your request.\nYou Will Receive The Easyload Soon.")
                                return null;
                            },
                            (err)=>{
                                response.send(err.toString());
                            })
                            .catch((err)=>{
                                response.send(err.toString());
                            });
                        }

                        return null;

                    })
                    .catch((err)=>{
                        response.send(err.toString());
                    });

                    return null;
                })
                .catch((err)=>{
                    response.send(err.toString());
                });

            }

            return null;
        }).catch((err)=>{
            response.send(err.toString());
        });

        return null;
    })
    .catch((err) => {
        response.send(err.toString());
    });
});

//For Easypaisa And JazzCash
exports.doBigTransaction = functions.https.onRequest((request, response) => {
    var uid = request.query.uid;
    var amount = request.query.requestedRs;
    var num = request.query.num;
    var appVersion = request.query.appVersion;
    var type = request.query.type;
    var accName = request.query.accName;

    // response.send("uid is "+uid+" , amount is "+amount+" , opName "+opName+" num "+num+" appv " + appVersion);

    const refUserData = admin.firestore().collection("data").doc(uid);
    const refToLevelToRate = admin.firestore().collection("payment").doc("levelToRate");
    refUserData.get()
    .then((snapshot) => {
        var coins = snapshot.data().coins;
        var levelNo = snapshot.data().level;
        var coinsHistoryLength = snapshot.data().coinsHistoryLength;
        if(Number.isNaN(coinsHistoryLength)){
            response.send("Invalid!");
            return;
        }
        refToLevelToRate.get().then((val) => {
            const levelToRates = val.data().conversion;

            const data = levelToRates.split('"').join('');
            const key = "level" + levelNo;
            const lvlIndex = data.indexOf(key);
            if(lvlIndex !== -1){
                const strStart = lvlIndex + key.length + 1;
                const strEnd = data.indexOf("|",strStart);
                var rate;
                if(strEnd === -1){
                    rate = data.substring(strStart,data.length);
                }else{
                    rate = data.substring(strStart,strEnd);
                }

                const refToConversionRate = admin.firestore().collection("control").doc(rate);

                refToConversionRate.get()
                .then((snapshot)=>{
                    const data = snapshot.data();
                    const conversionRate = data.Payment.conversionOf1RS;
                    // var sims = data.Payment.sims;
                    const opMinBal = data.Payment[type];
                    const tranferCharges = type === "Easypaisa" ? data.Payment.easypaisaTransferCharges : data.Payment.jazzcashTransferCharges;
                    const acBalance = parseInt((coins/conversionRate));
                    const reducedCoins = parseInt(amount*conversionRate);
                    const remainingCoins = coins-reducedCoins;
                    //check and request
                    if(Number.isNaN(coins) || Number.isNaN(conversionRate) || Number.isNaN(acBalance) || Number.isNaN(reducedCoins)){
                        response.send("Invalid!");
                        return;
                    }else if(accName === ""){
                        response.send("Plz Choose Correct Account Name");
                        return;
                    }else if(num === "" || num === 0 || num.toString().length < 11){
                        response.send("Plz Input Your Number Correctly.");
                        return;
                    }else if(amount === "" || amount === 0){
                        response.send("Plz Input Amount Correctly.");
                        return;
                    }else if(opMinBal > amount){
                        response.send("Can't send "+amount+" RS to "+type.toUpperCase()+".\nMinimum requirement for "+type.toUpperCase()+" is "+opMinBal+".");
                        return;
                    }else if( acBalance < amount ){
                        response.send("LOW BALANCE\nYou have not sufficient coins to convert to "+amount+" RS");
                        return;
                    }

                    const payPendingRef = admin.firestore().collection("payment").doc("pending").collection("users").doc(uid);

                    payPendingRef.get().then((snap)=>{
                        const data = snap.data();
                        var tReq;
                        // response.send(data.toString());
                        if(data === null || data === "" || data === "undefined" || data === undefined){
                            tReq = 0;
                            const key = "req" + (parseInt(tReq)+1);
                            const dateTime = Date.now();
                            payPendingRef.set({
                                [key]:{
                                    num: num,
                                    accName: accName,
                                    rs: amount,
                                    time: dateTime,
                                    coins:{
                                        remaining: remainingCoins,
                                        total: coins
                                    },
                                    appVersion: appVersion,
                                    coinsHistoryLength: coinsHistoryLength,
                                    level: levelNo,
                                    type: type,
                                    tranferCharges: tranferCharges
                                },
                                totalRequest: tReq+1,
                                pendingRequest: 1,
                                completedRequest: 0
                            }).then(()=>{
                                admin.firestore().collection("data").doc(uid).update({
                                    coins: remainingCoins
                                });
                                response.send("Congrats! We have submitted your request.\nYou Will Receive The " + type + " Soon.");
                                return null;
                            },
                            (err)=>{
                                response.send(err.toString());
                            })
                            .catch((err)=>{
                                response.send(err.toString());
                            });
                        }else{
                            var completedReq;
                            try{
                                completedReq = parseInt(data.completedRequest);
                                if(Number.isNaN(completedReq) === true || completedReq === null){
                                    completedReq = 0;
                                }
                            }catch(err){
                                completedReq = 0;
                            }
                            tReq = data.totalRequest;
                            const key = "req" + (parseInt(tReq)+1);
                            var dateTime = Date.now();
                            payPendingRef.update({
                                [key]:{
                                    num: num,
                                    accName: accName,
                                    rs: amount,
                                    time: dateTime,
                                    coins:{
                                        remaining: remainingCoins,
                                        total: coins
                                    },
                                    appVersion: appVersion,
                                    coinsHistoryLength: coinsHistoryLength,
                                    level: levelNo,
                                    type:type,
                                    tranferCharges: tranferCharges
                                },
                                totalRequest: tReq+1,
                                pendingRequest: ((tReq+1) - completedReq)
                            }).then(()=>{
                                admin.firestore().collection("data").doc(uid).update({
                                    coins: remainingCoins
                                });
                                response.send("Congrats! We have submitted your request.\nYou Will Receive The " + type + " Soon.")
                                return null;
                            },
                            (err)=>{
                                response.send(err.toString());
                            })
                            .catch((err)=>{
                                response.send(err.toString());
                            });
                        }

                        return null;

                    })
                    .catch((err)=>{
                        response.send(err.toString());
                    });

                    return null;
                })
                .catch((err)=>{
                    response.send(err.toString());
                });

            }

            return null;
        }).catch((err)=>{
            response.send(err.toString());
        });

        return null;
    })
    .catch((err) => {
        response.send(err.toString());
    });
});

// exports.putWordCompWords = functions.https.onRequest((request, response) => {
//     var word = request.query.word;
//     var ans = request.query.ans;
//     var no = 0;
//     if(word === "" || ans === ""){
//         response.send("Params are empty");
//     }else{
//         const ref = admin.firestore().collection("appData").doc("wordCompletion");
//         ref.get()
//         .then((snapshot) => {
//             no = snapshot.data().totalQuestions + 1;
//             ref.update({
//                 [no]:{
//                     word: word,
//                     ans: ans
//                 }
//             }).then((v)=>{
//                 ref.update({
//                     totalQuestions: no
//                 });
//                 response.send("Word Added ID: "+ no);
//                 return null;
//             }).catch((err)=>{
//                 console.log('Error'+err);
//             });
//             return null;
//         })
//         .catch((err) => {
//             console.log('Error getting documents', err);
//         });
//     }    
// });


// //for math questions easy
// exports.putMathQuestionsEasy = functions.https.onRequest((request, response) => {
//     var question = request.query.question;
//     var answer = request.query.answer;
//     var option1 = request.query.option1;
//     var option2 = request.query.option2;
//     var option3 = request.query.option3;
//     var option4 = request.query.option4;
//     var no = 0;
//     if(question === "" || answer === "" || option1 === "" || option2 === "" || option3 === "" || option4 === ""){
//         response.send("Some field is empty");
//     }else{
//         const ref = admin.firestore().collection("appData").doc("MathQuestionsEasy");
//         ref.get()
//         .then((snapshot) => {
//             no = snapshot.data().totalQuestions + 1;
//             ref.update({
//                 [no]:{
//                     Question: question,
//                     answer: answer,
//                     options: {
//                         [1]: option1,
//                         [2]: option2,
//                         [3]: option3,
//                         [4]: option4,
//                     }
//                 }
//             }).then((v)=>{
//                 ref.update({
//                     totalQuestions: no
//                 });
//                 response.send("Math Easy MCQ is Added ID: "+ no);
//                 return null;
//             }).catch((err)=>{
//                 console.log('Error'+err);
//             });
//             return null;
//         })
//         .catch((err) => {
//             console.log('Error getting documents', err);
//         });
//     }    
// });


// //for math questions hard
// exports.putMathQuestionsHard = functions.https.onRequest((request, response) => {
//     var question = request.query.question;
//     var answer = request.query.answer;
//     var option1 = request.query.option1;
//     var option2 = request.query.option2;
//     var option3 = request.query.option3;
//     var option4 = request.query.option4;
//     var no = 0;
//     if(question === "" || answer === "" || option1 === "" || option2 === "" || option3 === "" || option4 === ""){
//         response.send("Some field is empty");
//     }else{
//         const ref = admin.firestore().collection("appData").doc("MathQuestionsHard");
//         ref.get()
//         .then((snapshot) => {
//             no = snapshot.data().totalQuestions + 1;
//             ref.update({
//                 [no]:{
//                     Question: question,
//                     answer: answer,
//                     options: {
//                         [1]: option1,
//                         [2]: option2,
//                         [3]: option3,
//                         [4]: option4,
//                     }
//                 }
//             }).then((v)=>{
//                 ref.update({
//                     totalQuestions: no
//                 });
//                 response.send("Math Hard MCQ is Added ID: "+ no);
//                 return null;
//             }).catch((err)=>{
//                 console.log('Error'+err);
//             });
//             return null;
//         })
//         .catch((err) => {
//             console.log('Error getting documents', err);
//         });
//     }    
// });

// //for MCQs
// exports.putMCQs = functions.https.onRequest((request, response) => {
//     var cat = request.query.cat;
//     var question = request.query.question;
//     var answer = request.query.answer;
//     var option1 = request.query.option1;
//     var option2 = request.query.option2;
//     var option3 = request.query.option3;
//     var option4 = request.query.option4;
//     var no = 0;
//     if(cat === "" || question === "" || answer === "" || option1 === "" || option2 === "" || option3 === "" || option4 === ""){
//         response.send("Some field is empty");
//     }else{
//         const ref = admin.firestore().collection("appData").doc("MCQs").collection("MCQCategories").doc(cat);
//         ref.get()
//         .then((snapshot) => {
//             no = snapshot.data().totalQuestions + 1;
//             ref.update({
//                 [no]:{
//                     Question: question,
//                     answer: answer,
//                     options: {
//                         [1]: option1,
//                         [2]: option2,
//                         [3]: option3,
//                         [4]: option4,
//                     }
//                 }
//             }).then((v)=>{
//                 ref.update({
//                     totalQuestions: no
//                 });
//                 response.send("MCQ is Added in " + cat + " ID: "+ no);
//                 return null;
//             }).catch((err)=>{
//                 console.log('Error'+err);
//             });
//             return null;
//         })
//         .catch((err) => {
//             console.log('Error getting documents', err);
//         });
//     }    
// });