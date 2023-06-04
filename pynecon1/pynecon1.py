import pynecone as pc


class State(pc.State):
    colors: list[str] = [
        "yellow",
        "yellow",
        "yellow",
        "yellow",
    ]
    def change_color(self, color, index):
        self.colors[index] = color
    

def index():
    return pc.vstack(
        pc.text("What is the full form of HTML?"
        ),
        pc.vstack(
            pc.button (
                "option A",
                
                 default_value="yellow",
                 on_click= State.change_color("red", 0),
                 bg=State.colors[0],
                
            ),
            pc.button(
                "option B",
                default_value="yellow",
                on_click= State.change_color("red", 1),
                bg=State.colors[1],
            ),
            pc.button(
                "option C",
                default_value=State.colors[2],
                on_click= State.change_color("green", 2),
                bg=State.colors[2],
            ),
            pc.button(
                "option D",
                default_value=State.colors[3],
                on_click= State.change_color("red", 3),
                bg=State.colors[3],
            ),
        )
    )


app = pc.App(state=State)
app.add_page(index)
app.compile()