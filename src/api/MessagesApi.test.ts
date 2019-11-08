import {emptyMessage, emptySpeciesMessage, isSpeciesMessage, Message} from "./MessagesApi";

test("check message fails isSpeciesMessage check", () => {
    let message: Message = emptyMessage("Example");
    let res = isSpeciesMessage(message);
    expect(res).toBe(false);
});

test("check species message passes isSpeciesMessage check", () => {
    let message: Message = emptySpeciesMessage("Kermit");
    let res = isSpeciesMessage(message);
    expect(res).toBe(true);
});
