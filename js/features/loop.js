function getLoopSave() {
    const s = {
        loop: E(0),
        mega_loop:E(0),
        super_loop: E(0),
        hyper_loop: E(0),
        omega_loop: E(0),
        infinity_loop: E(0),



    }
    return s
}


RESET.loop = {
    unl: ()=>player.hsj >= 8,

    req: ()=>player.sol.bestStage.gte(3250),
    reqDesc: ()=> `Reach stage ${format(3250)} atleast once!`,
    resetDesc: `
    COMPLETELY restart the game, but with a loop.<br><br>
    Loops will provide a 1x boost per loop, which gets better the higher the tier is.<br>
    This boost applies to <i><b>nearly</b></i> resource and stat.
    `,
    resetGain: () => tmp.loops.loopgain.lt(2) ? `Restart for ${format(tmp.loops.loopgain)} loop.` : `Restart for +${format(tmp.loops.loopgain)} loops.`,
    title: '<img style="width: 32px; height: 32px;" src="images/Icons/loop.png">The End<img style="width: 32px; height: 32px;" src="images/Icons/loop.png>',
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


tmp_update.push(()=>{
    const tl = tmp.loops
    if (player.sol.bestStage.gte(3250) && player.sol.bestStage.lt(7777)) {
        tl.loopgain = E(1)
    } 
    else if (player.sol.bestStage.gte(7777)) {
        tl.loopgain = E(1).add(player.sol.bestStage.div(7777).floor())
    }
    tmp.loopmult = E(1).add(player.loops.loop)

    tmp.tloopmult = tmp.loopmult
    .add(Decimal.mul(10, player.loops.mega_loop))
    .add(Decimal.mul(50, player.loops.super_loop))
    .add(Decimal.mul(275, player.loops.hyper_loop))
    .add(Decimal.mul(1000, player.loops.omega_loop))
    .pow(Decimal.pow(1.05, player.loops.infinity_loop))
})