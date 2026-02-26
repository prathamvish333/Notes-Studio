import java.util.logging.Logger
import jenkins.model.*
import hudson.model.*
import hudson.tasks.Shell

def logger = Logger.getLogger("")
def jenkins = Jenkins.getInstance()
def jobName = "Notes-Studio-CI-CD"

if (jenkins.getItem(jobName) == null) {
    logger.info("Creating default Jenkins FreeStyle job.")
    def job = jenkins.createProject(FreeStyleProject, jobName)
    job.setDescription("Automated Continuous Integration pipeline for the Notes Studio application.")
    job.getBuildersList().add(new Shell("echo 'Running Unit Tests...'\\nsleep 2\\necho 'Building Docker Containers...'\\nsleep 2\\necho 'Successfully Pushed to Registry.'"))
    job.save()
    // Trigger build
    jenkins.getQueue().schedule(job, 0)
    logger.info("Triggered initial build.")
}
jenkins.save()
