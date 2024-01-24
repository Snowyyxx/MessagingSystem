class Confession:
    count = 0
    def __init__(self, message, receiver_name, receiver_branch_subgroup, title):
        self.title = title
        self.message = message
        self.receiver_name = receiver_name
        self.receiver_branch_subgroup = receiver_branch_subgroup
        Confession.count += 1
        self.confession_id = Confession.count
