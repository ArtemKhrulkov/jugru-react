import * as React from "react";
import "./Cards.css";
import { observer } from "mobx-react-lite";
import { TalksData } from "../../types/TalksData";
import { useEffect, useMemo, useState } from "react";
import { useStores } from "../../hooks";

const Cards = observer(() => {
  const { talksStore } = useStores();
  const observableTalks: TalksData[] = talksStore.getTalks();
  const observableFilteredTalks: TalksData[] = talksStore.getFilteredTalks();
  const [talks, setTalks] = useState<TalksData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (talks.length > 0) {
      setLoading(false);
    }
  }, [talks]);

  useMemo(() => {
    setTalks(observableTalks);
  }, [observableTalks]);

  useMemo(() => {
    setTalks(observableFilteredTalks);
  }, [observableFilteredTalks]);

  return (
    <main className="App-cards-main">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          {talks.length > 0 ? (
            talks.map((lecture: TalksData) => {
              const tags = lecture.tags.join(" / ").toUpperCase();
              return (
                <section className="App-cards-section" key={`id-${lecture.id}`}>
                  <p className="App-cards-title">{lecture.title}</p>
                  <p className="App-cards-speaker">{lecture.speaker}</p>
                  <p className="App-cards-tags">{tags}</p>
                </section>
              );
            })
          ) : (
            <p>No Talks</p>
          )}
        </React.Fragment>
      )}
    </main>
  );
});

export default Cards;
