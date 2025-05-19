from types import SimpleNamespace

def get_current_user():
    # Return a mock user object with required attributes
    return SimpleNamespace(user_id=1, email="dev@example.com")
