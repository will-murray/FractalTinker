let leftIdList = ["pixelsHit","hitRatio","exTime","frameRate"];
let rightIdList = ["pixelsChecked","span", "pixelDepth"];
export function getJuliaSetStatistics(){
    let result = document.createElement("div");
    let left = document.createElement("div");
    let right = document.createElement("div");
    left.setAttribute("class", "statColumn");
    right.setAttribute("class", "statColumn");


    result.setAttribute("id", "stats");
    result.setAttribute("class", "GUIBOX");

    for(let i=0;i<leftIdList.length;i++){
        let stat = document.createElement("h1");
        stat.setAttribute("id", leftIdList[i]);
        stat.setAttribute("class", "stat");
        left.appendChild(stat);
    }
    for(let i=0;i<rightIdList.length;i++){
        let stat = document.createElement("h1");
        stat.setAttribute("id", rightIdList[i]);
        stat.setAttribute("class", "stat");
        right.appendChild(stat);
    }
    result.appendChild(left);
    result.appendChild(right);

    return result;



}