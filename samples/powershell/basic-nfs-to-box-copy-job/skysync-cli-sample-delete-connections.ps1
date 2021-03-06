﻿$connections = skysync-cli connections list --json | ConvertFrom-Json

#delete all connections except default 'My Computer' connection
foreach ($conn in $connections | Where-Object {($_.name -ne 'My Computer') -and ($_.status -ne 'deleted')}) {
    skysync-cli connections delete $conn.id
}

skysync-cli connections list --json | ConvertFrom-Json | Format-Table