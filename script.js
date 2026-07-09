const svg=d3.select("#graph");
const viewport=d3.select("#viewport");
const nodeLayer=d3.select("#node-layer");
const edgeLayer=d3.select("#edge-layer");
const tooltip=document.getElementById("tooltip");
const progressBar=document.getElementById("progress-value");
const progressText=document.getElementById("progress-text");
const loading=document.getElementById("loading");
const graphWidth=document.getElementById("graph-area").clientWidth;
const graphHeight=document.getElementById("graph-area").clientHeight;
const NODE_WIDTH=140;
const NODE_HEIGHT=50;
svg.attr("width",graphWidth).attr("height",graphHeight);
const validNodes=nodes.filter(n=>n.id&&n.title);
const simulationNodes=validNodes.map(n=>{
    let x;
    let y;
    const id = Number(n.id);
    if(id === 1){
        x = graphWidth / 2;
        y = graphHeight / 2;
    }
    else if(id >= 2 && id <= 30){
        x = graphWidth;
        y = graphHeight / 2;
    }
    else{
        x = graphWidth;
        y = graphHeight / 2;
    }
    return {...n,x,y};
});
const simulationLinks=[];

validNodes.forEach(node=>{
    node.children.forEach(child=>{
        if(validNodes.some(n=>n.id===child))
            simulationLinks.push({
                source:node.id,
                target:child
            });
    });
});

const nodeElements=[];
const lineElements=[];
let tooltipNode=null;

function updateProgress(value){
    progressBar.style.width=value+"%";
    progressText.textContent=`読み込み中 ${value}%`;
}

// ---------- 矢印 ----------

svg.append("defs")
.append("marker")
.attr("id","arrow")
.attr("viewBox","0 0 10 10")
.attr("refX",10)
.attr("refY",5)
.attr("markerWidth",8)
.attr("markerHeight",8)
.attr("orient","auto")
.append("path")
.attr("d","M0 0 L10 5 L0 10Z")
.attr("fill","#000");

// ---------- 線 ----------

simulationLinks.forEach(link=>{
    const line=edgeLayer.append("line")
        .attr("class","link");
    lineElements.push({element:line,link:link});
});

// ---------- ノード ----------

simulationNodes.forEach((node,index)=>{
    const g=nodeLayer.append("g")
        .attr("class","node")
        .style("cursor","pointer");
    g.append("rect")
        .attr("width",NODE_WIDTH)
        .attr("height",NODE_HEIGHT)
        .attr("rx",8)
        .attr("ry",8)
        .attr("fill",`hsl(200,65%,${(node.level??0)*12}%)`);
    const titleText = g.append("text")
        .attr("x", NODE_WIDTH / 2)
        .attr("y", NODE_HEIGHT / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(node.title);
    let fontSize = 18;
    titleText.attr("font-size", fontSize);
    while (titleText.node().getComputedTextLength() > NODE_WIDTH - 20 && fontSize > 8) {
        fontSize--;
        titleText.attr("font-size",fontSize);
    }
    const tip=g.append("foreignObject")
        .attr("class","tooltip")
        .style("pointer-events","none")
        .attr("x",-50)
        .attr("y",60)
        .attr("width",240)
        .attr("height",1000);
    g.on("mouseenter",function(){
        d3.select(this).raise();
        const id = node.id;
        // 自分を光らせる
        d3.select(this)
            .classed("active",true);
        // 子ノードを光らせる
        nodeElements.forEach(item=>{
            const child = node.children.includes(item.data.id);
            if(child){
                item.element.classed(
                    "neighbor",
                    true
                );
            }
        });
        // 子への矢印だけ光らせる
        lineElements.forEach(item=>{
            const source = item.link.source.id;
            const target = item.link.target.id;
            if(source === id){
                item.element.classed(
                    "active",
                    true
                );
            }
        });
    })
    .on("mouseleave",function(){
        d3.select(this)
            .classed("active",false);
        nodeElements.forEach(item=>{
            item.element.classed(
                "neighbor",
                false
            );
        });
        lineElements.forEach(item=>{
            item.element.classed(
                "active",
                false
            );
        });
    });

    tip.append("xhtml:div")
        .text(node.description);
    nodeElements.push({element:g,data:node});
    updateProgress(Math.floor((index+1)/simulationNodes.length*70));
});

// ---------- ズーム ----------

const zoom=d3.zoom()
    .scaleExtent([0.2,3])
    .on("zoom",e=>viewport.attr("transform",e.transform));
svg.call(zoom).on("dblclick.zoom",null);


// ---------- 力学シミュレーション ----------

const rootNode=simulationNodes.find(n=>n.id==="1");
if(rootNode){
    rootNode.fx=graphWidth/2;
    rootNode.fy=graphHeight/2;
}

const simulation=d3.forceSimulation(simulationNodes)
.force(
    "link",
    d3.forceLink(simulationLinks)
        .id(d=>d.id)
        .distance(220)
        .strength(1)
)
.force(
    "charge",
    d3.forceManyBody()
        .strength(-1500)
)
.force(
    "collision",
    d3.forceCollide()
        .radius(10)
        .strength(1)
)
.force(
    "center",
    d3.forceCenter(
        graphWidth/2,
        graphHeight/2
    )
)
.force(
    "x",
    d3.forceX(graphWidth/2)
        .strength(0.05)
)
.force(
    "y",
    d3.forceY(graphHeight/2)
        .strength(0.05)
);

// ---------- ドラッグ ----------

const drag=d3.drag()

.on("start",(event,d)=>{
    if(!event.active)
        simulation.alphaTarget(0.08).restart();
    d.fx=d.x;
    d.fy=d.y;
})

.on("drag",(event,d)=>{
    d.fx=event.x;
    d.fy=event.y;
})

.on("end",(event,d)=>{
    simulation.alphaTarget(0);
    d.fx=d.x;
    d.fy=d.y;
});

nodeLayer
    .selectAll(".node")
    .data(simulationNodes)
    .call(drag);


// ---------- 初期配置 ----------

simulation
    .alpha(1)
    .alphaTarget(1)
    .restart();
setTimeout(()=>{
    simulation.alphaTarget(0);
    updateProgress(100);
    loading.style.display="none";
},500);


// ---------- 長方形と線の交点 ----------

function rectIntersection(cx,cy,tx,ty){
    const hw=NODE_WIDTH/2;
    const hh=NODE_HEIGHT/2;
    const dx=tx-cx;
    const dy=ty-cy;
    if(dx===0&&dy===0)
        return{x:cx,y:cy};
    const sx=dx===0?Infinity:hw/Math.abs(dx);
    const sy=dy===0?Infinity:hh/Math.abs(dy);
    const scale=Math.min(sx,sy);
    return{
        x:cx+dx*scale,
        y:cy+dy*scale
    };
}


// ---------- tick ----------

simulation.on("tick",()=>{
    updateProgress(
        Math.min(
            99,
            Math.floor((1-simulation.alpha())*100)
        )
    );

    // ノード
    nodeElements.forEach(({element,data})=>{
        element.attr(
            "transform",
            `translate(${data.x-NODE_WIDTH/2},${data.y-NODE_HEIGHT/2})`
        );
    });

    // 矢印
    lineElements.forEach(({element,link})=>{
        const s=link.source;
        const t=link.target;
        const p1=rectIntersection(
            s.x,s.y,
            t.x,t.y
        );
        const p2=rectIntersection(
            t.x,t.y,
            s.x,s.y
        );
        element
            .attr("x1",p1.x)
            .attr("y1",p1.y)
            .attr("x2",p2.x)
            .attr("y2",p2.y);
    });
});

function updateTooltip(){
    if(tooltipNode){
        const transform=d3.zoomTransform(svg.node());
        const x=transform.x+tooltipNode.x*transform.k;
        const y=transform.y+tooltipNode.y*transform.k;
        tooltip.style.left=(x+NODE_WIDTH/2+20)+"px";
        tooltip.style.top=y+"px";
    }
    requestAnimationFrame(updateTooltip);
}
updateTooltip();

