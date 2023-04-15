# Endpoints

## GET /api/buildings
Returns all buildings
<br/><br/>
Example response body:
```
[
    {
        "building_id": 1,
        "name": "Building A",
        "createdAt": "2023-03-20T14:14:52.743Z",
        "updatedAt": "2023-03-20T14:14:52.743Z"
    }
]
[
    {
        "building_id": 2,
        "name": "Building B",
        "createdAt": "2023-03-20T14:15:52.743Z",
        "updatedAt": "2023-03-20T14:15:52.743Z"
    }
]
```

## POST /api/listings
Add a new listing as the lender
<br/><br/>
Example request body:
```
{
    "name":"hammer",
    "compensation":20,
    "range_start":"2023-2-15",
    "range_end":"2023-4-10",
    "condition":"Good condition",
    "item_description":"A hammer",
    "building_id": 1,
    "item_type_id":1
}
```
<br/><br/>
Example response body:
```
{
    "listing_id": 4,
    "name": "hammer",
    "compensation": 20,
    "range_start": "2023-02-15T05:00:00.000Z",
    "range_end": "2023-04-10T04:00:00.000Z",
    "condition": "Good condition",
    "item_description": "A hammer",
    "building_id": 1,
    "lender_id": 1,
    "item_type_id": 1,
    "updatedAt": "2023-03-20T15:35:42.208Z",
    "createdAt": "2023-03-20T15:35:42.208Z",
    "borrower_id": null
}
```