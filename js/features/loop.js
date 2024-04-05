function getLoopSave() {
    const s = {
        loop: E(0),
        mega_loop:E(0),
        super_loop: E(0),
        hyper_loop: E(0),
        omega_loop: E(0),



    }
    return s
}




RESET.loop = {
    unl: ()=>player.hsj >= 8 || player.loops.loop.gte(1),


    req: ()=>player.sol.bestStage.gte(9100),
    reqDesc: ()=> `Reach stage ${format(9100)} atleast once!`,
    resetDesc: `
    COMPLETELY restart the game, but with a loop.<br><br>
    Loops will provide a 1x boost per loop, which gets better the higher the tier is.<br>
    This boost applies to <i><b>nearly</b></i> every resource and stat.<br><br><br>
    `,
    resetGain: () => tmp.loops.loopgain.lt(2) ? `Restart for ${format(tmp.loops.loopgain,0)} loop.` : `Restart for +${format(tmp.loops.loopgain,0)} loops.`,
    title: '<img style="width: 32px; height: 32px;" src="images/Icons/loop.png">The End<img style="width: 32px; height: 32px;" src="images/Icons/loop.png">',
    resetBtn: 'Loop!',
    reset() {
        if (this.req) {
            player.loops.loop = player.loops.loop.add(tmp.loops.loopgain)

            this.doReset()
        }
        updateTemp()
    },
    doReset() {
        const DATA = getPlayerData()
        let k = player.loops
        player = DATA
        player.loops = k
    }
}
const LOOP_RES = [
    'loop','mega_loop','super_loop','hyper_loop','omega_loop'
]
const LR2 = [
    'Loops','Mega Loops','Super Loops','Hyper Loops','Omega Loops'
]
const LRM = [
    0,10,50,275,1000
]
tmp.el.setup.loopinfo = () => {
    let loop_info = new Element("loopinfo_table")
    let table = ""
    for (let x = 0; x < LOOP_RES.length; x++) {
        let y = LOOP_RES[x]
        table += `<div id="loopinfo_${y}">
        <img src="images/${y}.png">${LR2[x]}: ${format(player.loops[y],0)} ${y == "loop" ? `(${formatMult(tmp.loopmult,0)})` : `(+${formatMult(LRM[x].mul(player.loops[y]))})`} Loop Multi
        </div><br>`
    }
    loop_info.setHTML(table)
}

tmp.el.update.loopinfo = () => {
    for (let x=0;x<LOOP_RES.length;x++){
        let y = LOOP_RES[x]
        tmp.el["loopinfo_"+y].setHTML(`
        <img src="images/${y}.png">${LR2[x]}: ${format(player.loops[y],0)} ${y == "loop" ? `(${formatMult(tmp.baseloopbonus,0)})` : `(+${formatMult(LRM[x].mul(player.loops[y]))})`} Loop Multi.
        `)
        tmp.el["loopinfo_"+y].setDisplay(player.loops[y].gte(1))
    }
}

tmp_update.push(()=>{
    if (!tmp.loops) tmp.loops = {}
    const tl = tmp.loops
    
        tl.loopgain = player.sol.bestStage.div(9100).add(player.sol.bestStage.sub(9100).div(2500)).floor()
    
    tmp.baseloopbonus = E(1).add(player.loops.loop)

    tmp.loopbonus = E(1)
    .add(player.loops.loop)
    .add(Decimal.mul(10, player.loops.mega_loop))
    .add(Decimal.mul(50, player.loops.super_loop))
    .add(Decimal.mul(275, player.loops.hyper_loop))
    .add(Decimal.mul(1000, player.loops.omega_loop))
    .pow(Decimal.pow(1.05, player.loops.infinity_loop))
})