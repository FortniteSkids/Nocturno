const express = require("express")
const app = express()

app.post("/fortnite/api/game/v2/tryPlayOnPlatform/account/:id", (req, res) => {
    res.setHeader("Content-Type", "text/plain");
	res.send(true);
})

app.post("/fortnite/api/game/v2/grant_access/:id", (req, res) => {
    res.json({})
})

app.get("/waitingroom/api/waitingroom", (req, res) => {
    res.status(204).end()
})

app.get("/catalog/api/shared/bulk/offers", (req, res) => {
    res.json({})
})

app.get("/fortnite/api/game/v2/enabled_features", (req, res) => {
    res.json([])
})

app.get("/lightswitch/api/service/:serviceId/status", (req, res) => {
	res.json([{
        "serviceInstanceId": "fortnite",
        "status": "UP",
        "message": "fortnite is up.",
        "maintenanceUri": null,
        "overrideCatalogIds": [
            "a7f138b2e51945ffbfdacc1af0541053"
        ],
        "allowedActions": [
            "PLAY",
            "DOWNLOAD"
        ],
        "banned": false,
        "launcherInfoDTO": {
            "appName": "Fortnite",
            "catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
            "namespace": "fn"
        }
    }])
})

app.get("/lightswitch/api/service/bulk/status", (req, res) => {
    res.json([{
        "serviceInstanceId": "fortnite",
        "status": "UP",
        "message": "fortnite is up.",
        "maintenanceUri": null,
        "overrideCatalogIds": [
            "a7f138b2e51945ffbfdacc1af0541053"
        ],
        "allowedActions": [
            "PLAY",
            "DOWNLOAD"
        ],
        "banned": false,
        "launcherInfoDTO": {
            "appName": "Fortnite",
            "catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
            "namespace": "fn"
        }
    }])
})

app.get("/account/api/public/account", (req, res) => {
    res.json([
        {
            "id": req.query.accountId,
            "displayName": req.query.accountId,
            "externalAuths": {}
        }        
    ])
})

app.get("/account/api/public/account/:accountId", (req, res) => {
    res.json({
        "id": req.params.accountId,
        "displayName": req.params.accountId,
        "externalAuths": {}
    })
})

app.get("/fortnite/api/versioncheck", (req, res) => {
    res.json({type: "NO_UPDATE"})
})

app.get("/account/api/epicdomains/ssodomains", (req, res) => res.json({}))

app.get("/fortnite/api/game/v2/twitch/*", (req, res) => {
    res.json({})
})

app.delete("/account/api/oauth/sessions/kill", (req, res) => {
    res.status(204).end()
})

app.delete("/account/api/oauth/sessions/kill/*", (req, res) => {
    res.status(204).end()
})

app.get("/fortnite/api/cloudstorage/system", (req, res) => {
    res.json([]) //todo
})

app.get("/fortnite/api/cloudstorage/user/*", (req, res) => res.json([]))
app.all("/fortnite/api/cloudstorage/user/*/*", (req, res) => res.status(204).end())

app.post("/account/api/oauth/token", (req, res) => {
    if (req.body.grant_type != "password") {
        return res.json({
            "access_token": "NocturnoToken",
            "expires_in": 28800,
            "expires_at": "9999-12-02T01:12:01.100Z",
            "token_type": "bearer",
            "refresh_token": "NocturnoToken",
            "refresh_expires": 86400,
            "refresh_expires_at": "9999-12-02T01:12:01.100Z",
            "account_id": "Your Mother",
            "client_id": "NoctunroClientId",
            "internal_client": true,
            "client_service": "fortnite",
            "displayName": "Your Mother",
            "app": "fortnite",
            "in_app_id": "Your Mother",
            "device_id": "NocturnoDeviceId"
        })
    }

    var Name = req.body.username.split("@")[0]
    res.json({
        "access_token": "NocturnoToken",
        "expires_in": 28800,
        "expires_at": "9999-12-02T01:12:01.100Z",
        "token_type": "bearer",
        "refresh_token": "NocturnoToken",
        "refresh_expires": 86400,
        "refresh_expires_at": "9999-12-02T01:12:01.100Z",
        "account_id": Name,
        "client_id": "NoctunroClientId",
        "internal_client": true,
        "client_service": "fortnite",
        "displayName": Name,
        "app": "fortnite",
        "in_app_id": Name,
        "device_id": "NocturnoDeviceId"
    })
})

app.get("/fortnite/api/matchmaking/session/findPlayer/*", (req, res) => {
    res.status(204).end()
})

app.get("/fortnite/api/receipts/v1/account/*/receipts", (req, res) => {
    res.status(204).end()
})

app.post("/datarouter/api/v1/public/data", (req, res) => {
    res.status(204).end()
})

app.get("/fortnite/api/calendar/v1/timeline", async (req, res) => {
	res.json({
				"channels": {
				  "client-matchmaking": {
					"states": [
					  {
						"validFrom": "2020-01-01T20:28:47.830Z",
						"activeEvents": [],
						"state": {
						  "region": {
							"OCE": {
							  "eventFlagsForcedOn": [
								"Playlist_DefaultDuo"
							  ]
							},
							"CN": {
							  "eventFlagsForcedOn": [
								"Playlist_DefaultDuo"
							  ]
							},
							"NAE": {
							  "eventFlagsForcedOn": [
								"Playlist_DefaultDuo"
							  ]
							},
							"NAW": {
							  "eventFlagsForcedOn": [
								"Playlist_DefaultDuo"
							  ]
							},
							"EU": {
							  "eventFlagsForcedOn": [
								"Playlist_DefaultDuo"
							  ]
							},
							"BR": {
							  "eventFlagsForcedOn": [
								"Playlist_DefaultDuo"
							  ]
							},
							"ASIA": {
							  "eventFlagsForcedOn": [
								"Playlist_DefaultDuo"
							  ]
							},
							"NA": {
							  "eventFlagsForcedOn": [
								"Playlist_DefaultDuo"
							  ]
							}
						  }
						}
					  }
					],
					"cacheExpire": "9999-01-01T22:28:47.830Z"
				  },
				  "client-events": {
					"states": [
					  {
						"validFrom": "2020-01-01T20:28:47.830Z",
						"activeEvents": [
						  {
							"eventType": `EventFlag.Season1`,
							"activeUntil": "9999-01-01T00:00:00.000Z",
							"activeSince": "2020-01-01T00:00:00.000Z"
						  },
						  {
							"eventType": `EventFlag.LobbySeason1`,
							"activeUntil": "9999-01-01T14:00:00.000Z",
							"activeSince": "2020-01-01T13:00:00.000Z"
						  }
						],
						"state": {
						  "activeStorefronts": [],
						  "eventNamedWeights": {},
						  "seasonNumber": 1,
						  "seasonTemplateId": `AthenaSeason:athenaseason1`,
						  "matchXpBonusPoints": 0,
						  "seasonBegin": "2020-01-01T13:00:00Z",
						  "seasonEnd": "9999-01-01T14:00:00Z",
						  "seasonDisplayedEnd": "9999-01-01T07:30:00Z",
						  "weeklyStoreEnd": "9999-01-01T00:00:00Z",
						  "stwEventStoreEnd": "9999-01-01T00:00:00.000Z",
						  "stwWeeklyStoreEnd": "9999-01-01T00:00:00.000Z",
						  "dailyStoreEnd": "9999-01-01T00:00:00Z"
						}
					}
				],
				"cacheExpire": "9999-01-01T22:28:47.830Z"
			}
		},
		"eventsTimeOffsetHrs": 0,
		"cacheIntervalMins": 10,
		"currentTime": "2020-01-01T18:13:41.770Z"
	})
})

app.get("/account/api/oauth/verify", (req, res) => {
	res.status(204).end()
})

app.get("/fortnite/api/storefront/v2/keychain", (req, res) => {
	res.json(["74AF07F9A2908BB2C32C9B07BC998560:V0Oqo/JGdPq3K1fX3JQRzwjCQMK7bV4QoyqQQFsIf0k=:Glider_ID_158_Hairy"])
})

module.exports = app