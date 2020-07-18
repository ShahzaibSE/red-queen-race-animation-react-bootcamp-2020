import React, {useEffect, useRef} from 'react'
// Assets.
import "./RedAliceQueen.scss"
import cup_cake_image from "./../../images/cup-cake.png"

export const RedAliceQueen = () => {
    let background1 = useRef(null)
    let background2 = useRef(null)
    let foreground1 = useRef(null)
    let foreground2 = useRef(null)
    let red_queen_alice_spirit = useRef(null)
    let cake = useRef(null)
    let bottle = useRef(null)
    let nomingCake = useRef(null)

    useEffect(()=>{
        /* Background animations */
        var sceneryFrames =   [
            { transform: 'translateX(100%)' },
            { transform: 'translateX(-100%)' }   
        ];

        var sceneryTimingBackground = {
            duration: 36000,
            iterations: Infinity
        };

        var sceneryTimingForeground = {
            duration: 12000,
            iterations: Infinity
        };

        // var background1 = document.getElementById('background1');
        // var background2 = document.getElementById('background2');

        var background1Movement = background1.current.animate(
        sceneryFrames, sceneryTimingBackground);
        background1Movement.currentTime = background1Movement.effect.timing.duration / 2;

        var background2Movement = background2.current.animate(
        sceneryFrames, sceneryTimingBackground);

        // var foreground1 = document.getElementById('foreground1');
        // var foreground2 = document.getElementById('foreground2');

        var foreground1Movement = foreground1.current.animate(
        sceneryFrames, sceneryTimingForeground);
        foreground1Movement.currentTime = foreground1Movement.effect.timing.duration / 2;

        var foreground2Movement = foreground2.current.animate(
        sceneryFrames, sceneryTimingForeground);
        // Keyframes for bouncing the controls
        let tryMeKeys = [
            { transform: 'translateY(0) scale(1, 1) rotate(0)', easing: 'ease-in' },
            { transform: 'translateY(0) scale(1.1, .9) rotate(0)' },
            // { transform: 'translateY(-10%) scale(.9, 1.1) rotate(0)', offset: .4 },
            // { transform: 'translateY(-10%) scale(1, 1) rotate(10deg)', offset: .5 },
            // { transform: 'translateY(-10%) scale(1, 1) rotate(-10deg)', offset: .7 },
            // { transform: 'translateY(-10%) scale(1,1) rotate(0deg)', offset: .8, easing: 'ease-in' },
            { transform: 'translateY(0) scale(1, 1) rotate(0)' }
        ];

        function trytheCake(){
            cake.current.animate(tryMeKeys, { id: 'bounce', delay: 7000, duration: 2000, iterations: 2 });
          }
        trytheCake();
        let trytheCakeTimer = setInterval(trytheCake, 12000);
          
        function trytheBottle(){
            bottle.current.animate(tryMeKeys, { id: 'bounce', duration: 2000, iterations: 2 }); 
        }
        let trytheBottleTimer = setInterval(trytheBottle, 12000);

        var spriteFrames = [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-100%)' }   
        ];

        // var redQueen_alice_sprite = document.getElementById('red-queen_and_alice_sprite');
        var redQueen_alice_sprite = red_queen_alice_spirit.current;

        var redQueen_alice = redQueen_alice_sprite.animate(
        spriteFrames, {
            easing: 'steps(7, end)',
            direction: "reverse",
            duration: 600,
            playbackRate: 1,
            iterations: Infinity
        });

        /* Alice tires so easily! 
            Every so many seconds, reduce their playback rate so they slow a little. 
        */
        var sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];

        var adjustBackgroundPlayback = function() {
            if (redQueen_alice.playbackRate < .8) {
            sceneries.forEach(function(anim) {
                anim.playbackRate = redQueen_alice.playbackRate/2 * -1;
            });
            } else if (redQueen_alice.playbackRate > 1.2) {
            sceneries.forEach(function(anim) {
                anim.playbackRate = redQueen_alice.playbackRate/2;
            });
            } else {
            sceneries.forEach(function(anim) {
                anim.playbackRate = 0;    
            });
            }   
        }
        adjustBackgroundPlayback();

        /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
        /* But if they fall under 1, the background slides backwards */
        setInterval( function() {
            /* Set decay */
            if (redQueen_alice.playbackRate > .4) {
            redQueen_alice.playbackRate *= .9;    
            } 
            adjustBackgroundPlayback();
        }, 3000);

        var goFaster = function() {
            /* But you can speed them up by giving the screen a click or a tap. */
            redQueen_alice.playbackRate *= 1.1;
            adjustBackgroundPlayback();
        }

        window.addEventListener("click", goFaster);
        window.addEventListener("touchstart", goFaster);
    })
    
    return (
        <div>
            <div className="sky"></div>
            <div className="earth">
                <div id="red-queen_and_alice">
                    <img id="red-queen_and_alice_sprite" ref={red_queen_alice_spirit} 
                         src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" 
                         srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" 
                         alt="Alice and the Red Queen running to stay in place."/>
                </div>
                <div id="eat-me" ref={cake}>
                    <img id="eat-me_sprite" ref={nomingCake} 
                        src={cup_cake_image} 
                        alt="A cake labeled Eat Me"/>
                </div>
                <div id="bottle" ref={bottle}>
                    <div id="liquid"></div>
                    <img className="fg" 
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/drink-me_fg_small.png" 
                            srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/drink-me_fg.png 2x" 
                            alt="Bottle drink to shrink Alice"/>
                </div>
            </div>
            <div className="scenery" id="foreground1" ref={foreground1}>
                <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
            </div>
            <div className="scenery" id="foreground2" ref={foreground2}>    
                <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
                <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
            </div>
            <div className="scenery" id="background1" ref={background1}>
                <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
                <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
                <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
            </div>
            <div className="scenery" id="background2" ref={background2}>
                <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />

                <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
                <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
            </div>
        </div>
    )
}
