export interface User {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  status: string;
  _links?: {
    self: {
      href: string;
    },
    edit: {
      href: string;
    }
    avatar: {
      href: string;
    }
  }

}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
  _links?: {
    self: {
      href: string;
    },
    edit: {
      href: string;
    }
  }
}

export interface Comment {
  id: string;
  post_id: string;
  name: string;
  email: string;
  body: string;
  _links?: {
    self: {
      href: string;
    },
    edit: {
      href: string;
    }
  }
}

export interface AppState {
  users: User[];
  posts: Post[];
  comments: Comment[];
  selectedUser?: User;
  errors?: string;
  postsLoading: boolean;
  commentsLoading: boolean;
}

