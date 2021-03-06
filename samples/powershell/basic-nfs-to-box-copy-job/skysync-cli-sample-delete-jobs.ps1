﻿$jobs = skysync-cli jobs list --json | ConvertFrom-Json 

#delete all transfer jobs (preserve system jobs)
foreach ($job in $jobs | Where-Object {($_.kind -eq 'transfer') -and ($_.status -ne 'deleted')}) {
    skysync-cli jobs delete $job.id
}

skysync-cli jobs list --json | ConvertFrom-Json | Format-Table 
