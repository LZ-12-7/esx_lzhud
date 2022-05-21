local ESX = exports['es_extended']:getSharedObject()

function Status()
    self = {}
    local PlayerData = ESX.GetPlayerData()

    self.triggerEvent = function(e, ...)
        TriggerEvent(e, ...)
    end

    self.sendNui = function(data)
        SendNUIMessage(data)
    end

    for i=1, #PlayerData.accounts, 1 do
        if PlayerData.accounts[i].name == 'black_money' then
            blackMoney = PlayerData.accounts[i].money
        elseif PlayerData.accounts[i].name == 'bank' then
            bank = PlayerData.accounts[i].money
        elseif PlayerData.accounts[i].name == 'money' then
            money = PlayerData.accounts[i].money
        end 
    end

    self.init = function()
        CreateThread(function()
            while(true)do
                Wait(Config.TickTime)
                    self.triggerEvent('esx_status:getStatus', 'hunger', function(status)
                        hunger = status.val / 10000 
                    end)

                    self.triggerEvent('esx_status:getStatus', 'thirst', function(status)
                        thirst = status.val / 10000 
                    end)

                    if IsPauseMenuActive() then
                        self.sendNui({ action = 'hide' })
                    else
                        self.sendNui({ action = 'show' })
                    end

                    self.sendNui({
                        type        = "updatehud";
                        method      = "hud";
                        health      = (GetEntityHealth(PlayerPedId()) - 100);
                        shield      = (GetPedArmour(PlayerPedId()));
                        hunger      = hunger;
                        thirst      = thirst;
                        playerid    = (GetPlayerServerId(PlayerId()));
                        money       = money;
                        bank        = bank;
                        black_money = blackMoney;
                    })

                    if (Config.HideMiniMap) then
                        if IsPedInAnyVehicle(PlayerPedId()) then
                            self.sendNui({insideveh = true})
                            DisplayRadar(true)
                        else
                            self.sendNui({insideveh = false})
                            DisplayRadar(false)
                        end
                    end
            end
        end)
    end
    return self
end

CreateThread(function()
    Status = Status()

    SetTimeout(500, function()
        Status.init()
    end)
end)
