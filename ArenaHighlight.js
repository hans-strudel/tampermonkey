// ==UserScript==
// @name         Arena Highlight
// @version      1.0.1
// @description  Highlight Individual BOM Items
// @author       Hans Strausl @ BestronicsInc 2016
// @match        https://app.bom.com/items/detail-bom*
// @downloadURL  https://raw.githubusercontent.com/hans-strudel/tampermonkey/master/ArenaHighlight.js
// ==/UserScript==
/* jshint -W097 */

var BOM

var oldColor = "#fff"
var firstThree = "#f4f4fb"
var highColor = "#00cc44"
var importantColor = "#04c8c2"

var importants = ["PROGRAM", " IC", "IC ", "FAB", "P.C.B.", "Program"]

function init(){
    console.log("ArenaHighlight Loaded -- Hans Strausl @ Bestronics")
    BOM = document.getElementsByClassName("TABLEList")[0]
    BOM.onchange = update
    BOMitems = BOM.getElementsByTagName("tr")
    setTimeout(update, 1000)
}

function update(){
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
                        console.log(isImportant)
                        }
                })
                cols[j].style.backgroundColor = (check || isImportant)?((isImportant)?importantColor:highColor):((j<3)?firstThree:oldColor)
            }
        }
    }
}

window.addEventListener('load', init, false)
