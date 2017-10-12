<#
.DESCRIPTION
    Sample script in PowerShell to showcase the use of the CLI to generate and manage SkySync jobs. Example scenario:
        * Create an NFS connection
        * Create a Box connection
        * Create a SkySync job that utilizes these connections
        * Start the job

.REFERENCE
    https://skysync.atlassian.net/wiki/spaces/SSP/pages/15302683/SkySync+Command-line+Interface

.NOTES
    Setup/Config:
        1. Create file 'skysync-cli.json' and place one directory above cli project/script that is being executed and add the following JSON block to the file:

            {
	        "output-json": true,
	        "server": "http://localhost:9090/",
	        "username": "***********",
	        "password": "***********"
            } 
        2. Configure connection auth files
        3. Update source and destination paths
                Pathing Usage:
                    a. Path Format Example for My Comp (FS): '/C/TestFiles/C7546397471/L0/B1'
                    b. Path Format Example for Box: '/TEST/CLI_TEST_01'
                    c. Path Format Example for NFS: '/C7546397471/L0/B1'  -start folder under configured Connection Share
    Execution:
        Run script from examples dir (cd .\~\skysync-cli\examples\skysync-cli-sample-script.ps1)
#>

$ErrorActionPreference = 'Stop'

#set variables for paths
$sourcePath = '/TestFolder1'
$destinationPath = '/Tests/CLI_Example_01'

# create connections & convert Json response to PSObject. Note skysync-cli.json specifies "output-json": true
$nfsConn01 = skysync-cli connections add --name 'nfs-conn-01' --platform 'nfs' --auth-file 'nfs-auth-01.json' | ConvertFrom-Json
$boxConn01 = skysync-cli connections add --name 'box-conn-01' --platform 'box' --auth-file 'box-auth-01.json' | ConvertFrom-Json

skysync-cli connections list | ConvertFrom-Json | Format-Table

# set job configuration (copy job from NFS -> Box)
$jobConfig = '{"transfer_type": "copy","source":{"connection": {"id": "<source_id>"},"target": {"path": "<source_path>"}}, "destination":{"connection": {"id": "<destination_id>"}, "target": {"path": "<destination_path>"}}}' | ConvertFrom-Json

$jobConfig.source.connection.id = $nfsConn01.id
$jobConfig.source.target.path = $sourcePath

$jobConfig.destination.connection.id = $boxConn01.id
$jobConfig.destination.target.path = $destinationPath

<#
-------------------------------------------------------------------------------------------------------------
IMPORTANT: Once the task to update the cli project for accepting json from stdin on the cmdline is complete,
           remove/comment out all code below line 66 and uncomment this block.
-------------------------------------------------------------------------------------------------------------

$jobConfig = $jobConfig | ConvertTo-Json 

# create job and start it
$job = skysync-cli jobs add --name "cli-example-job-01" --manual --in $jobConfig | ConvertFrom-Json

skysync-cli jobs start $job.id  | ConvertFrom-Json | Format-Table
#>

#create config file on disk since stdin is not currently supported from terminal/cmdline
$jobConfig = $jobConfig | ConvertTo-Json | Out-File -encoding ASCII jobconfig.json

# create job and start it
$job = skysync-cli jobs add --name "cli-example-job-01" --manual --options-file=jobconfig.json | ConvertFrom-Json

skysync-cli jobs start $job.id  | ConvertFrom-Json | Format-Table

#remove temp jobconfig file
Remove-Item jobconfig.json

