// ==UserScript==
// @name         Arena Highlight
// @version      1.0.3
// @description  Highlight Individual BOM Items
// @author       Hans Strausl @ BestronicsInc 2016
// @match        https://app.bom.com/*
// @downloadURL  https://raw.githubusercontent.com/hans-strudel/tampermonkey/master/ArenaHighlight.user.js
// ==/UserScript==
/* jshint -W097 */

var BOM, ITEMS

var oldColor = "#fff"
var firstThree = "#f4f4fb"
var highColor = "#00cc44"
var importantColor = "#04c8c2"

var importants = ["PROGRAM", "PCB", "FAB", "P.C.B.", "Program", "Pcb"]

function init(){
    console.log("ArenaHighlight Loaded -- Hans Strausl @ Bestronics")
    BOM = document.getElementsByClassName("TABLEList").BOM || 
        document.getElementById("InboxMessagesList")
    console.log(document.getElementsByClassName("TABLEList"))
    if (BOM){
        BOM.onchange = update
        setTimeout(update, 1000)
    } else {
        console.log("No table found, trying div")
        ITEMS = document.getElementById("search-list")
    }
    if (ITEMS){
        ITEMS.onchange = itemsupdate
    } else {
        console.log("No items found either.")
    }
}

function itemsupdate(){
    ITEMSlist = document.getElementsByClassName("TABLEList").qTable
        .getElementsByTagName("div")[1]
        .children[1]
        .children[0]
        .children
    for (var i = 0; i < ITEMSlist.length; i++){
        var inp = ITEMSlist[i].getElementsByTagName("input")
        if (inp.length > 0){
            var check = inp[0].checked
            divs = inp[0].parentElement.parentElement.getElementsByTagName("div")
            for (var j = 0; j < divs.length; j++){
                var inn = divs[j].innerHTML
                var isImportant = false
                importants.forEach(function(elem,index, array){
                    if (inn.indexOf(elem) > -1){
                        isImportant = true
                    }
                })
                divs[j].style.backgroundColor = (check || isImportant)?((isImportant)?importantColor:highColor):((j<3)?firstThree:oldColor)
            }
        }
    }
}

function update(){
    BOMitems = BOM.getElementsByTagName("tr")
    for (var i = 0; i < BOMitems.length; i++){
        var inp = BOMitems[i].getElementsByTagName("input")
        if (inp.length > 0) {
            var check = inp[0].checked
            var cols = BOMitems[i].getElementsByTagName("td")
            for (var j = 0; j < cols.length; j++){
                var inn = cols[j].innerHTML
                var isImportant = false
                importants.forEach(function(elem,index, array){
                    if (inn.indexOf(elem) > -1){
                        isImportant = true
                    }
                })
                cols[j].style.backgroundColor = (check || isImportant)?((isImportant)?importantColor:highColor):((j<3)?firstThree:oldColor)
            }
        }
    }
}

window.addEventListener('load', function(){
    setTimeout(init, 1000)
}, false)
