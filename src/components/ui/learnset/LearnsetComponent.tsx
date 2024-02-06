import { useState } from "react";
import { LearnsetInfo } from "../../../models/types/LearnsetInfo";

interface LearnsetInfoProps {
  learnset: LearnsetInfo;
}

export default function LearnsetComponent({ learnset }: LearnsetInfoProps) {
  const [expanded, setExpanded] = useState(false);

  function toggleExpansion() {
    setExpanded(!expanded);
  }

  return <></>;
}

/* <Accordion
      expanded={expanded}
      onChange={toggleExpansion}
      className="max-w-full border-2 border-slate-800"
    >
      <AccordionSummary aria-controls="learnset-content" id="learnset-header">
        <Typography className="new font-montserrat">
          New Learnset
          {
            <KeyboardArrowDownIcon
              className={expanded ? "icon-up" : "icon-down"}
            />
          }
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List className="grid grid-flow-col grid-rows-6 overflow-auto max-h-[24rem]">
          {learnset.moves
             .filter((move) => move.level !== 1)
            .map((move, index) => (
              <ListItem className="w-max min-w-[12rem]" key={index}>
                <ListItemText
                  primaryTypographyProps={{
                    className: "new",
                  }}
                  primary={`${move.level === 0 ? "Evo" : "Lvl " + move.level}`}
                />
                <ListItemText primary={cleanMoveName(move.move)} />
              </ListItem>
            ))}
        </List>
      </AccordionDetails>
    </Accordion> */
