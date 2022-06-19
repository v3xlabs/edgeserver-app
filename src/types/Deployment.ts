export type Deployment = {
    deploy_id: string;
    app_id: string;
    cid: string;
    sid: string;
    timestamp: string;
    git_sha?: string;
    git_actor?: string;
    git_type?: string;
    git_src?: string;
    comment?: string;
};
