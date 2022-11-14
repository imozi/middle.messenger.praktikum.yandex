import { HTTPTransport } from './HTTPTransport';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

describe('core/HTTPTransport', () => {
  // @ts-ignore
  HTTPTransport.API_URL = 'https://jsonplaceholder.typicode.com';
  const fetchUser = new HTTPTransport('/users');
  const fetchPosts = new HTTPTransport('/posts');

  it('must be defined', () => {
    expect(fetchUser).toBeDefined();
  });

  it('should return users', async () => {
    const users = await fetchUser.get<User[]>('');

    expect(users.length).toEqual(10);
  });

  it('should return user with id', async () => {
    const user = await fetchUser.get<User>('/1');

    expect(user.id).toEqual(1);
  });

  it('should create new posts', async () => {
    const post = await fetchPosts.post<Post>('', {
      title: 'new post 123',
      body: 'this is new post',
      userId: 1,
    });

    expect(post.title).toEqual('new post 123');
  });

  it('should update posts', async () => {
    const post = await fetchPosts.get<Post>('/1');

    const data = Object.assign(post, {
      title: 'update new post',
      body: 'this is updated post',
    });

    const newPost = await fetchPosts.put<Post>(`/${post.id}`, data);

    expect(newPost.title).toEqual('update new post');
  });
});
