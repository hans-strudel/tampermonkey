// ==UserScript==
// @name         Arena Highlight
// @version      1.1.8
// @description  Highlight Individual BOM Items
// @author       Hans Strausl @ BestronicsInc 2016
// @match        https://app.bom.com/*
// @downloadURL  https://raw.githubusercontent.com/hans-strudel/tampermonkey/master/ArenaHighlight.user.js
// ==/UserScript==
/* jshint -W097 */

var BOM, ITEMS;

var oldColor = "#fff"
var firstThree = "#f4f4fb"
var highColor = "#00cc44"
var importantColor = "#04c8c2"

var importants = ["PROGRAM", "PCB", "FAB", "P.C.B.", "P.C.B", "Program", "Pcb", "Printed"];

function init(){
    console.log("ArenaHighlight Loaded -- Hans Strausl @ Bestronics")
    
    var search = document.getElementsByName('search_textfield')[0];
    if (search){
        search.oninput = function(e){
            localStorage.searchSave = e.target.value;
        };
        search.value = localStorage.searchSave || '';
    }
    if (search) search.accessKey = 's';
    var pagetips = document.getElementById('pagetips');
    if (pagetips){
        pagetips.style.height = '5px';
        pagetips.style.overflowY = 'scroll';
    }
    
    BOM = document.getElementsByClassName("TABLEList").BOM ||
        document.getElementById("InboxMessagesList")
    console.log(document.getElementsByClassName("TABLEList"))
    if (BOM){
        BOM.onchange = update
        document.onscroll = update
        setTimeout(update, 100)
    } else {
        console.log("No table found, trying div")
        ITEMS = document.getElementById("search-list")
    }
    if (ITEMS){
        ITEMS.onchange = itemsupdate
        document.onscroll = itemsupdate
    } else {
        console.log("No items found either.")
    }
}

function itemsupdate(){
    console.log('updating')
    ITEMSlist = document.getElementsByClassName("TABLEList").qTable
        .getElementsByTagName("div")[1]
        .children[1]
    ITEMSlist.onscroll = itemsupdate
    ITEMSlist = ITEMSlist.children[0]
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
    setTimeout(init, 500);
}, false)
