let JuliaStatIdList = ["pixelsChecked","pixelsHit","hitRatio","exTime"];
export function getJuliaSetStatistics(){
    let result = document.createElement("div");
    result.setAttribute("id", "stats");
    result.setAttribute("class", "GUIBOX");

    for(let i=0;i<4;i++){
        let stat = document.createElement("h1");
        stat.setAttribute("id", JuliaStatIdList[i]);
        stat.setAttribute("class", "stat");
        result.appendChild(stat);
    }
    return result;



}