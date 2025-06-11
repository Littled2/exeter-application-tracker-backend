/// <reference path="../pb_data/types.d.ts" />


onRecordCreate((e) => {

    try {

        // Forward the ticket to rapid apps
        const formData = new FormData();

        formData.append("title", e.record.get("info"))
        formData.append("application_id", "674e4b64031d1")
        formData.append("ticket_id", e.record.get("id"))
        formData.append("info", e.record.get("info"))

        const res = $http.send({
            url: "https://apps.edward-blewitt.uk/backend/api/issue-tracker/issues/POST-new-issue.php",
            method: "POST",
            body: formData,
        })

        // If the request fails, mark as not forwarded

        if (res.statusCode == 200) {
            e.record.set("forwarded", true)
        } else {
            e.record.set("forwarded", false)
        }

    } catch (error) {
        console.log("Failed to forward ticket to Rapid Apps", error)
        $app.logger().error("Failed to forward ticket to Rapid Apps", error)

        e.record.set("forwarded", false)
    }

    e.next()

}, "tickets")