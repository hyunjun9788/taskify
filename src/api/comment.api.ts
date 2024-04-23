
import { API, API_COMMENTS } from '@/constants/API';
import instance from '@/api/instance';

interface CreateComments {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}
const postCreateComment = ({
  content,
  cardId,
  columnId,
  dashboardId,
}: CreateComments) => {
  return instance({
    url: API.USERS,
    method: 'POST',
    data: {
      content,
      cardId,
      columnId,
      dashboardId,
    },
  });
};

const getCommentList = (cardId: string) => {
  return instance({
    url: API.COMMENTS,
    method: 'GET',
    params: {
      cardId,
    },
  });
};

const putCommentEdit = (content: string) => {
  return instance({
    url: API_COMMENTS.BY_ID,
    method: 'PUT',
    data: {
      content,
    }
  });
};

const deleteComment = () => {
    return instance({
        url: API_COMMENTS.BY_ID,
        method:'Delete'
        data:{
            
        }
    })
}

export default { getCommentList, postCreateComment, putCommentEdit };
