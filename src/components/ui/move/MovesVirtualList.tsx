import VirtualList from "../../common/VirtualList";
import { moves } from "../../../data";
import MoveComponent from "./MoveComponent";
import { createMemo } from "solid-js";
import { searchStore } from "../../../data/store/search.store";

export default function MovesVirtualList() {

  const filteredMoves = createMemo(() => {
    const searchText = searchStore.text;
    if (!searchText) return moves;
    return moves.filter((move) => move.name.toLowerCase().includes(searchText.toLowerCase()));
  });

  return (
    <VirtualList
      class="list-base"
      items={filteredMoves()}
      rowHeight={108}
      rootHeight={window.innerHeight - 64}
    >
      {(item) => {
        if (!item) return null;
        return (
          <MoveComponent move={item} />
        );
      }}
    </VirtualList>
  )
}