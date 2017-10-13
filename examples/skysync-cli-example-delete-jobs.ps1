$jobs = skysync-cli jobs list | ConvertFrom-Json 

#delete all transfer jobs (preserve system jobs)
foreach ($job in $jobs | Where-Object {$_.kind -eq 'transfer'}) {
    skysync-cli jobs delete $job.id
}

skysync-cli jobs list | ConvertFrom-Json | Format-Table
