import pynecone as pc

class PyneconConfig(pc.Config):
    pass

config = PyneconConfig(
    app_name="pynecon1",
    db_url="sqlite:///pynecone.db",
    env=pc.Env.DEV,
)