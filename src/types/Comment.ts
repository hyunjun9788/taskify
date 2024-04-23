export interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface CardInfoProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}
export interface CardConfirmModalProps {
  cardInfoData: CardInfoProps;
}

export interface CommentItemProps {
  id: number;
  content: string;
  createdDate: string;
  updatedDate: string;

  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  edit: (content: string, id: number) => void;
  remove: (id: number) => void;
}
