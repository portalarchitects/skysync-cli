$jobs = skysync-cli jobs list --output-json=true | ConvertFrom-Json 

#delete all transfer jobs (preserve system jobs)
foreach ($job in $jobs | Where-Object {($_.kind -eq 'transfer') -and ($_.status -ne 'deleted')}) {
    skysync-cli jobs delete $job.id
}

skysync-cli jobs list --output-json=true | ConvertFrom-Json | Format-Table 
