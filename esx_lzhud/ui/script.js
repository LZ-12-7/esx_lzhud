$(() => {
    console.log('LZ Hud loaded');

    const updatehud = (data) => {
        let v = data

        if (v.type === 'updatehud'){
            $('.info-health').text(Math.round(v.health) + "");
            $('.info-shield').text(Math.round(v.shield) + "");
            $('.info-hunger').text(Math.round(v.hunger) + "");
            $('.info-thirst').text(Math.round(v.thirst) + "");
            $('.info-playerid').text(Math.round(v.playerid) + "");
            $('#money').text(Math.round(v.money) + "");
            $('#bank-money').text(Math.round(v.bank) + "");
            $('#black-money').text(Math.round(v.black_money) + "");
        }

    }

    const sethud = (data, interface) => {
        let v = data
        if(interface.type === 'hud'){
            if (Math.round(v.health) > 75) {
                $("#health").hide(300)
            } else if (Math.round(v.health) < 75) {
                $("#health").show(300)
            }
            if (Math.round(v.shield) > 75) {
                $("#shield").hide(300)
            } else if (Math.round(v.shield) < 75) {
                $("#shield").show(300)
            }
            if (Math.round(v.hunger) > 75) {
                $("#hunger").hide(300)
            } else if (Math.round(v.hunger) < 75) {
                $("#hunger").show(300)
            }
            if (Math.round(v.thirst) > 75) {
                $("#thirst").hide(300)
            } else if (Math.round(v.thirst) < 75) {
                $("#thirst").show(300)
            }
            
        } else if(interface.type === 'default'){
            $('#health').show(0)
            $('#shield').show(0)
            $('#hunger').show(0)
            $('#thirst').show(0)
            $('#identifier').show(0)
        }

        if (v.insideveh) {
            $(".bar").css({"left": "16vw"})
        } else {
            $(".bar").css({"left": "0vw"})
        }

        if (v.action === "show") {
            $(".bar").fadeIn(300)
        } else if (v.action === "hide") {
            $(".bar").fadeOut(300)
        }

    }

    eventListener = () => {
        self = {}

        self.init = () => {
            window.addEventListener('message', (event) => {
                const v = event.data
                updatehud(v)
                sethud(v, {type : v.method})
            })
        }

        return self
    }

    eventListener = eventListener()

    eventListener.init()
});