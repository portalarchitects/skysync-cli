<#
.DESCRIPTION
    Exports list of name, email, and id of users of a platform connection via SkySync accounts endpoint and cli auth session

.INPUTS
    BaseUrl (url of SkySync + /v1)
	ConnectionId (id of connection - > skysync-cli connections list)

.OUTPUTS
    CSV file in relative directory containing name, email, and id of users

.NOTES
    * Script uses the SkySync CLI to obtain Auth Token. Must navigate to path where skysync-cli is available to execute
        * cd C:\dev\local\skysync-cli

    * To route local endpoint calls from PowerShell through Fiddler for debugging/testing:
        * $baseUrl must use machine name and not "localhost"
        * uncomment -Proxy 'http://localhost:8888', which is Fiddlers Proxy address
    
.EXAMPLE
    .\'export skysync connection accounts to csv.ps1' http://DESKTOP-9BHVIFS:9090/v1 fcfef7e24b164a0ca181cb55b0078d40
#>

Param(
	[string]$baseUrl = "http://[machine name]:9090/v1",
	[string]$connectionId = "[connection_id]"
)

$offsetValue = 0
$pages = 1
$currentPage = 0
$totalCount = 0
$accounts = @()

#get skysync access token via skysync-cli
$accessToken= skysync-cli sessions token --output-json=false
$authHeader = @{"Authorization"="Bearer $accessToken";}

#call endpoint with paging (endpoint only returns 1000 items at a time)
do {
    $accountsEndpoint ="$baseUrl/connections/$connectionId/accounts?offset=$offsetValue&limit=1000&fields=all"
    $accountsResponse = Invoke-RestMethod $accountsEndpoint -Headers $authHeader -Proxy 'http://localhost:8888'

    $accounts += $accountsResponse.accounts
    $totalCount = $accountsResponse.meta.total_count  
   
    if ($totalCount -gt 1000){
        $pages = [math]:: Ceiling($totalCount / 1000)       
    }
    
    $currentPage++
    $offsetValue = ($currentPage * 1000)

} while ($pages -ne $currentPage)

$accounts | Select-Object -Property name,email,id | Format-Table
$accounts | Select-Object -Property name,email,id | Export-Csv "accounts_$connectionId.csv" -NoTypeInformation

write-host "$totalCount Total Accounts for Connection $connectionId Successfully Exported to CSV" -ForegroundColor Green
