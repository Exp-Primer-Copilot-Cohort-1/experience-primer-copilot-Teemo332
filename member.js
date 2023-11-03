function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var projects = document.getElementById("projects");
    var contact = document.getElementById("contact");
    var memberButton = document.getElementById("memberButton");
    var skillsButton = document.getElementById("skillsButton");
    var projectsButton = document.getElementById("projectsButton");
    var contactButton = document.getElementById("contactButton");
    member.style.display = "block";
    skills.style.display = "none";
    projects.style.display = "none";
    contact.style.display = "none";
    memberButton.style.backgroundColor = "#4CAF50";
    skillsButton.style.backgroundColor = "#2e8b57";
    projectsButton.style.backgroundColor = "#2e8b57";
    contactButton.style.backgroundColor = "#2e8b57";
}