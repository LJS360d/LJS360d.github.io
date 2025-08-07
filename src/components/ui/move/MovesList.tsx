import { createMemo, For } from "solid-js";
import { moves } from "../../../data";
import { searchStore } from "../../../data/store/search.store";
import MoveComponent from "./MoveComponent";

export default function MovesList() {

  const filteredMoves = createMemo(() => {
    const searchText = searchStore.text;
    if (!searchText) return moves;
    return moves.filter((move) => move.name.toLowerCase().includes(searchText.toLowerCase()));
  });

  return (
    <ul class="list-base">
      <For each={filteredMoves()}>
        {(move) => (
          <MoveComponent move={move} />
        )}
      </For>
    </ul>
  )
}