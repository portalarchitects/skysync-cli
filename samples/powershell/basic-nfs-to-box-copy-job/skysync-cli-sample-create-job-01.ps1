<#
.DESCRIPTION
    Sample script in PowerShell to showcase the use of the CLI to generate and manage SkySync jobs. Example scenario:
        * Create an NFS connection
        * Create a Box connection
        * Create a SkySync job that utilizes these connections
        * Start the job

.REFERENCE
    https://github.com/portalarchitects/skysync-cli

.NOTES
    Setup/Config:
        1. Update file 'skysync-cli.json' with applicable server, username, and password information.  
        2. Update connection auth files: nfs-auth-01.json & box-auth-01.json.
			a. Note Box authentication file utilizes a Box Service Account (https://developer.box.com/v2.0/docs/configuring-service-accounts)
        3. Update variables in script, including source and destination paths
                Pathing Usage:
                    a. Path Format Example for NFS: '/TestFolder1'  -start folder under configured connection share
					b. Path Format Example for Box: '/Tests/CLI_Sample_01' -folder under root of configured Box account
    Execution:
        Run script from samples dir (cd .\~\skysync-cli\samples\powershell\basic-nfs-to-box-copy-job\skysync-cli-sample-script.ps1)
#>

$ErrorActionPreference = 'Stop'

#set variables
$nfsConnName = 'nfs-conn-01'
$boxConnName = 'box-conn-01'
$sourceNFSPath = '/TestFolder1'
$destinationBoxPath = '/Tests/CLI_Sample_01'
$sampleJobName = 'cli-sample-job-02'

# create connections, output responses to Json, and convert Json to a typed PSObject
$nfsConn01 = skysync-cli connections add --name $nfsConnName --platform 'nfs' --auth-file 'nfs-auth-01.json' --json | ConvertFrom-Json
$boxConn01 = skysync-cli connections add --name $boxConnName --platform 'box' --auth-file 'box-auth-01.json' --json | ConvertFrom-Json

skysync-cli connections list --json | ConvertFrom-Json | Format-Table 

# set job configuration (copy job from NFS -> Box)
$jobConfig = '{{"transfer_type": "copy","source":{"connection": {"id": "<source_id>"},"target": {"path": "<source_path>"}}, "destination":{"connection": {"id": "<destination_id>"}, "target": {"path": "<destination_path>"}}}}' | ConvertFrom-Json

$jobConfig.source.connection.id = $nfsConn01.id
$jobConfig.source.target.path = $sourceNFSPath

$jobConfig.destination.connection.id = $boxConn01.id
$jobConfig.destination.target.path = $destinationBoxPath

$jobConfig = $jobConfig | ConvertTo-Json 

# grab job config json block, pipe it in, create job and start it
$job = $jobConfig | skysync-cli jobs add --name $sampleJobName --manual --in --json | ConvertFrom-Json

skysync-cli jobs start $job.id --json | ConvertFrom-Json | Format-Table 

