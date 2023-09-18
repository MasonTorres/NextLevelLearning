export type IUserActivity = {
    Type: string,
    Value: string,
};

export type Title = {
    Title: string,
};
export type Code = {
    Code: string,
    Type: string, // Bash, Python, etc.
};
export type Description = {
    Description: string,
};
export type Note = {
    Note: string,
};
export type Image = {
    Image: string,
};

export type IBackgroundActivity = {
    Type: string,
    Value: string,
};

// Options
// title: string
// code: string
// description: string
// note: string
// image: url to public image

export type IContent = {
    section: number,
    title: string,
    description: string,
    tasks: ITask[],
    
}

export type ITask = {
    step: number,
    title: string,
    userActivity: IUserActivity[],
    backgroundActivity: IBackgroundActivity[],
}