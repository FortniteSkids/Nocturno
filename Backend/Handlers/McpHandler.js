const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")
const moment = require("moment");

function makeid(length) {
    var result           = '';
    var characters       = '0123456789abcdefghiklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.post("/fortnite/api/game/v2/profile/:accountId/client/:command", async (req, res) => {
    var accountId = req.params.accountId
    var command = req.params.command
    var profileId = req.query.profileId
    var rvn = req.query.rvn
    var profile

    //Creates folder for account profiles
    if (!fs.existsSync(path.join(__dirname, `../Files/Profiles/${accountId}`))) {
        fs.mkdir(path.join(__dirname, `../Files/Profiles/${accountId}`), function(err, nb) {
            if (err) {
                console.log("MCP: Failed to create dir: " + path.join(__dirname, `../Files/Profiles/${accountId}`))
            }
        })
    }

    //Creates profiles for account
    if (!fs.existsSync(path.join(__dirname, `../Files/Profiles/${accountId}/${profileId}.json`))) {
        var defaultProfile = require(path.join(__dirname, `../Files/ProfileTemplate/${profileId}.json`))
        defaultProfile.accountId = accountId
        defaultProfile.created = new Date().toISOString()
        defaultProfile.updated = new Date().toISOString()

        fs.writeFileSync(path.join(__dirname, `../Files/Profiles/${accountId}/${profileId}.json`), JSON.stringify(defaultProfile, null, 2), function(err) {
            if (err) 
            { 
                console.log('error: ', err) 
            }
        })
    }

    profile = require(path.join(__dirname, `../Files/Profiles/${accountId}/${profileId}.json`))

    var response = {
        profileRevision: profile.rvn || 1,
        profileId: profileId,
        profileChanges: [],
        profileCommandRevision: profile.commandRevision || 0,
        serverTime: new Date().toISOString(),
        responseVersion: 1
    }

    switch(command) {
        case "QueryProfile":
            break
        case "ClientQuestLogin":
            break
        case "SetHardcoreModifier":
            break
        case "PopulatePrerolledOffers":
            break
        case "RefreshExpeditions":
            break
        case "GetMcpTimeForLogin":
            break
        
        case "ClaimMfaEnabled":
            profile.stats.attributes["mfa_reward_claimed"] = true;
            break

        case "SetMtxPlatform":
            response.profileChanges[0] = {
                changeType: "statModified",
                name: "current_mtx_platform",
                value: req.body.newPlatform || "EpicPC"
            }

            return res.json(response)

        case "ClaimQuestReward":
            profile.items[req.body.questId].attributes.quest_state = "Claimed";
			profile.items[req.body.questId].attributes.last_state_change_time = new Date().toISOString();

            response.profileChanges.push({
				"changeType": "itemAttrChanged",
				"itemId": req.body.questId,
				"attributeName": "quest_state",
				"attributeValue": profile.items[req.body.questId].attributes.quest_state
            })

            response.profileChanges.push({
                "changeType": "itemAttrChanged",
				"itemId": req.body.questId,
				"attributeName": "last_state_change_time",
				"attributeValue": profile.items[req.body.questId].attributes.last_state_change_time
            })
            
            return res.json(response)

        case "ClaimLoginReward":
			let CurrentDate = new Date();
			var DateFormat = moment(CurrentDate).format('YYYY-MM-DD') + "T00:00:00.000Z";

            profile.stats.attributes.daily_rewards.nextDefaultReward += 1;
            profile.stats.attributes.daily_rewards.totalDaysLoggedIn += 1;
            profile.stats.attributes.daily_rewards.lastClaimDate = DateFormat;
            profile.stats.attributes.daily_rewards.additionalSchedules.founderspackdailyrewardtoken.rewardsClaimed += 1;

            response.profileChanges.push({
                "changeType": "statModified",
                "name": "daily_rewards",
                "value": profile.stats.attributes.daily_rewards
            })
            
            return res.json(response)

        case "SetPinnedQuests":
            profile.stats.attributes.client_settings.pinnedQuestInstances = req.body.pinnedQuestIds;

            response.profileChanges.push({
                "changeType": "statModified",
                "name": "client_settings",
                "value": profile.stats.attributes.client_settings
            })
            
            return res.json(response)

        case "PurchaseHomebaseNode":
            const ID = makeid(5) + "-" + makeid(4) + "-" + makeid(6) + "-" + makeid(4);
            profile.items[ID] = {"templateId":`HomebaseNode:${req.body.nodeId}`,"attributes":{"item_seen":true},"quantity":1};

            response.profileChanges.push({
                "changeType": "itemAdded",
                "itemId": ID,
                "item": profile.items[ID]
            })
            
            return res.json(response)

        case "SetHomebaseBanner":
            switch(req.query.profileId) {

                case "profile0":
                    profile.stats.attributes.homebase.bannerIconId = req.body.homebaseBannerIconId;
                    profile.stats.attributes.homebase.bannerColorId = req.body.homebaseBannerColorId;
                break;

                case "common_public":
                    profile.stats.attributes.banner_icon = req.body.homebaseBannerIconId;
                    profile.stats.attributes.banner_color = req.body.homebaseBannerColorId;
                break;

            }

            if (req.query.profileId == "profile0")
            {
                response.profileChanges.push({
                    "changeType": "statModified",
                    "name": "homebase",
                    "value": profile.stats.attributes.homebase
                })
            }

            if (req.query.profileId == "common_public")
            {
                response.profileChanges.push({
                    "changeType": "statModified",
                    "name": "banner_icon",
                    "value": profile.stats.attributes.banner_icon
                })

                response.profileChanges.push({
                    "changeType": "statModified",
                    "name": "banner_color",
                    "value": profile.stats.attributes.banner_color
                })
            }

            return res.json(response)

        case "ClaimCollectedResources":
            break

        case "AssignTeamPerkToLoadout":
            profile.items[req.body.loadoutId].attributes.team_perk = req.body.teamPerkId || "";

            response.profileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": req.body.loadoutId,
                "attributeName": "team_perk",
                "attributeValue": profile.items[req.body.loadoutId].attributes.team_perk
            })

            return res.json(response)

        case "AssignGadgetToLoadout":
            if (req.body.slotIndex && req.body.loadoutId)
			{
				switch(req.body.slotIndex) {

					case 0:
						profile.items[req.body.loadoutId].attributes.gadgets = [{"gadget":req.body.gadgetId || "","slot_index":0},profile.items[req.body.loadoutId].attributes.gadgets[1]];
					break
					
					case 1:
						profile.items[req.body.loadoutId].attributes.gadgets = [profile.items[req.body.loadoutId].attributes.gadgets[0],{"gadget":req.body.gadgetId || "","slot_index":1}];
					break
				}
			}

            response.profileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": req.body.loadoutId,
                "attributeName": "gadgets",
                "attributeValue": profile.items[req.body.loadoutId].attributes.gadgets
            })

            return res.json(response)

        case "AssignWorkerToSquad":
            profile.items[req.body.characterId].attributes.squad_id = req.body.squadId || "";
            profile.items[req.body.characterId].attributes.squad_slot_idx = req.body.slotIndex || 0;

            response.profileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": req.body.characterId,
                "attributeName": "squad_id",
                "attributeValue": profile.items[req.body.characterId].attributes.squad_id
            })

            response.profileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": req.body.characterId,
                "attributeName": "squad_slot_idx",
                "attributeValue": profile.items[req.body.characterId].attributes.squad_slot_idx
            })

            return res.json(response)

        case "IncrementNamedCounterStat":
            break

        case "MarkItemSeen":
            req.body.itemIds.forEach(id => {
                profile.items[id].attributes.item_seen = true
            })
            break

        case "IssueFriendCode":
            break
        case "RecycleItemBatch":
            break
        case "CreateOrUpgradeOutpostItem":
            break

        default:
            return res.status(404).json({})
    }

    profile.rvn += 1
    profile.commandRevision += 1
    profile.updated = new Date().toISOString()

    response.profileChanges = [{
        "changeType": "fullProfileUpdate",
        "profile": profile
    }];

    fs.writeFileSync(path.join(__dirname, `../Files/Profiles/${accountId}/${profileId}.json`), JSON.stringify(profile, null, 2), function(err) {
        if (err) 
        { 
            console.log('error: ', err) 
        }
    })

    res.json(response)
})

module.exports = app