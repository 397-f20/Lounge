function notify(title, body, iconURL, onClick) {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notification = new Notification(title, {
                body: body,
                icon: iconURL,
            });
            notification.onclick = onClick;
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notification = new Notification(title, {
                        body: body,
                        icon: iconURL,
                    });
                    notification.onclick = onClick;
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}

export default notify;