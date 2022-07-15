import { ref } from "vue";

export type repo = {
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
};

const STORAGE_KEY = "ghFinderLikes";

export const useGetLocalStorage = () =>{
  console.log(localStorage.getItem(STORAGE_KEY))
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
}

export const useSetLocalStorage = <T>(data: T) =>{
  console.log(data)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const useLocalStorage = () => {
  const repoLikeMap = ref< repo[]>(useGetLocalStorage());

  const repoLikeCount =  ():number => {
    console.log(repoLikeMap.value.length)
    return repoLikeMap.value.length;
  }
  const useSaveLike = (repo: repo) => {
    let data = {
      name: repo.name,
      full_name: repo.full_name,
      owner: { login: repo.owner.login },
    }
    repoLikeMap.value.push(data)
    useSetLocalStorage(repoLikeMap.value);
  };
  const useRemoveLike = (repo: repo) => {
    repoLikeMap.value.splice(repoLikeMap.value.indexOf(repo), 1);
    useSetLocalStorage(repoLikeMap.value);
  };

  return { useSaveLike, useRemoveLike, repoLikeMap, repoLikeCount };
};
