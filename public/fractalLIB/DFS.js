export default function DFS(grid){
    solve(grid,result,0,0);
}



//if a vertex has a neighbouring zero:
//   set color =  2
//   add vertex to list
//if a vertex has no neighbouring zeros:
//   set color = 3
//   search all of its 1 neighbours



/*
    0 - in set
    1 - is unchecked
    2 - is checked and on boundry of set
    3 - is checked and not on boundry 
*/
function solve(grid,result,i,j){
    if(i != 0){//left bound

    }
    if(j != 0){//top bound

    }
    if(i!= grid.length){//bottom bound

    }
    if(j!= grid.length){//right bound
        
    }
}