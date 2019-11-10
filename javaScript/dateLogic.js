let today = new Date();
let day = today.getDate();
let month = today.getMonth()+1;
let year = today.getFullYear();

if(day < 10) {
    day = '0' + day;
} 

if(month < 10) {
    month = '0'+ month;
 } 

let yesterday = `${year}-${month}-${day - 1}`

module.exports = {
    yesterday
}