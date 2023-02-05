export type DateType = string | Date | number
export type Nullable<T> = T | null
export type Dict = Record<strig, any>

// Hacker News Item
// id -	The item's unique id.
// deleted -	true if the item is deleted.
// type -	The type of item. One of "job", "story", "comment", "poll", or "pollopt".
// by -	The username of the item's author.
// time	- Creation date of the item, in Unix Time.
// text -	The comment, story or poll text. HTML.
// dead -	true if the item is dead.
// parent -	The comment's parent: either another comment or the relevant story.
// poll -	The pollopt's associated poll.
// kids	 -The ids of the item's comments, in ranked display order.
// url -	The URL of the story.
// score - The story's score, or the votes for a pollopt.
// title - The title of the story, poll or job. HTML.
// parts - A list of related pollopts, in display order.
// descendants - In the case of stories or polls, the total comment count.

type HNBase<T> = T extends "job" | "story" | "comment" | "poll" | "pollopt"
  ? {
      id: number
      by: string
      time: number
      kids: number[]
      type: T
      text?: string
      dead?: boolean
      deleted?: boolean
    }
  : never

// Akash you're overloading the type system. Need to find a better way to do this.
export type HNItem<T> = T extends "story" | "job" | "poll"
  ? HNBase<T> & {
      title: string
      score: number
      descendants: number
      url: string
    }
  : T extends "comment"
  ? HNBase<T> & {
      parent: number
    }
  : T extends "pollopt"
  ? HNBase<T> & {
      parts: number
      score: number
      poll: number
    }
  : HNBase<T>

export type HNUser = {
  id: string
  created: number
  karma: number
  about: string
  submitted: number[]
}
