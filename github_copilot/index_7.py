import re

e_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
p_regex = r'^[0-9]{3}-[0-9]{3}-[0-9]{4}$'
s_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$'
s2_regex = r'^[0-9]{3}-[0-9]{2}-[0-9]{4}$'

def check_valid(text, regex):
	if re.search(regex, text):
		print("Valid")
	else:
		print("Invalid")
