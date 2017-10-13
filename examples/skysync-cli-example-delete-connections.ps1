﻿$connections = skysync-cli connections list | ConvertFrom-Json

#delete all connections except default 'My Computer' connection
foreach ($conn in $connections | Where-Object {$_.name -ne 'My Computer'}) {
    skysync-cli connections delete $conn.id
}

skysync-cli connections list | ConvertFrom-Json | Format-Table