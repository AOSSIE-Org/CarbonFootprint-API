Contributing to the Project
=========================

All contributions to the project should follow the following procedure:

1. Create an issue. See the [guidelines for issues](#create-an-issue) given below for more information.
2. Create a merge request. See the [guidelines for merge request](#create-merge-request) given below for more information.

*Note:* Only the administrators of project are allowed to make changes without a merge request.

Create an Issue
---------------

If you find a bug in a project you’re using, have trouble following the documentation or have a question about the project – create an issue! 

For more information on how issues work, check out our [Issues guide](https://gitlab.com/help/user/project/issues/index.md).

#### Guidelines for Issues


 - Before creating an issue, check existing issues to see if it already
   exists. Try to avoid duplication of issues.
   
 - Be clear about what your problem is: what was the expected outcome,
   what happened instead? Detail how someone else can recreate the
   problem.
   
 - Paste error output or logs in your issue or in a Gist. If pasting
   them in the issue, wrap it in three backticks: " ``` "  so that it
   renders nicely.
 
- Tag the issues with a proper and appropriate label.
	

Create Merge Request
------------

If you’re able to patch a bug or add a feature, make a merge request (to the develop branch) with the code! Once you’ve submitted a merge request (to the develop branch) the maintainer(s) can compare your branch to the existing one and decide whether or not to incorporate (pull in) your changes.

Once you’ve opened a merge request a discussion will start around your proposed changes. Other contributors and users may comment on the merge request, but ultimately the decision is made by the maintainer(s). You may be asked to make some changes to your merge request, if so, add more commits to your branch and push them – they’ll automatically go into the existing merge request.

#### Guidelines for Merge Request

- **[Fork](https://gitlab.com/help/gitlab-basics/fork-project.md)** the repository and clone it locally. 
- Connect your local to the original ‘upstream’ repository by adding it as a remote. 
- **Pull in changes** from ‘upstream’ often so that you stay up to date so that when you submit your merge request, merge conflicts will be less likely.
- **Create a branch** for your edits. See [guidelines for naming branches](#create-a-branch) for naming conventions.
- **[Create a merge request](https://gitlab.com/help/user/project/merge_requests/index.md)** to `develop` branch in the original 'upstream' repository
- Add `fixes #<issue_number>` phrase in the merge request description to add a reference to the corresponding issue. See [information here](https://gitlab.com/help/user/project/issues/index.md) for referencing issues in the merge request.
- Explain in your merge request what steps you have taken to ensure that the code change doesn't break the existing project's functionality.
- **Include screenshots** of the before and after if your changes include differences in HTML/CSS. Drag and drop the images into the body of your merge request.
- **Add comments in code** to help the maintainer to merge/understand the code change.

Create a branch
-----------------

**Use short branch names.**  

This is important, because branch names show up in the merge commits that result from accepting merge requests and should be as expressive and concise as possible.

#### Naming Conventions

- Branches used when submitting merge requests should preferably be named according to GitLab issues.
  - If the branch resolves an issue with a `issue` label then name the branch as `#<issue_number>` e.g.: '#123'
  
- Otherwise, use succinct, lower-case, dash (-) delimited names, such as 'fix-warnings', 'fix-typo', etc. 


